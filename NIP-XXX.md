NIP-XXX
=======

Wordchain: Secure Word Verification for Trusted Groups
-------------------------------------------------------

`draft` `optional`

## Abstract

Wordchain is a protocol for trusted groups to share rotating verification words, enabling
human identity verification in an age of trivial AI voice and video cloning. Words are
derived deterministically from a shared secret seed using HMAC-SHA256 — no network is
required after initial setup. The protocol includes duress signalling: each member has a
personal duress word that silently alerts the group when they are under coercion, with
plausible deniability to the attacker.

## Motivation

AI voice cloning now requires as little as three seconds of audio. A thirty-second clip
and thirty minutes of work can produce a convincing clone. The security advice is already
widespread — "agree on a family safe word" — but common implementations are dangerously
naive:

- Static words that never rotate (one compromise burns the word forever)
- Human-chosen words with low entropy (predictable and guessable)
- No duress signalling (if a member is forced to reveal the word, there is no silent alarm)
- No protocol (just "remember a word" — no tooling, no synchronisation, no offline support)

Wordchain solves all of these by applying well-understood cryptographic primitives
(HMAC-SHA256, time-based counters) to the spoken-word verification problem, distributed
over Nostr relays with Meshtastic mesh as a resilient fallback.

## Terminology

| Term                  | Definition                                                                                    |
|-----------------------|-----------------------------------------------------------------------------------------------|
| Wordchain             | A deterministic sequence of verification words derived from a shared seed                    |
| Group seed            | A 256-bit random secret shared by all group members                                           |
| Rotation interval     | The time period for automatic word rotation (e.g. 86400 for 24 h, 604800 for 7 days)         |
| Counter               | `floor(unix_timestamp / rotation_interval)` — determines the current word                    |
| Verification word     | The current group word, derived from seed + counter                                           |
| Duress word           | A member's personal word that signals compromise, derived from seed + member pubkey + counter |
| Burn-after-use        | Advancing the counter early after a word is used for verification                             |
| Wordlist              | A curated list of exactly 2048 words optimised for spoken clarity                             |

## Specification

### Derivation Scheme

All word derivation uses HMAC-SHA256. The counter is encoded as a big-endian 64-bit
unsigned integer (8 bytes).

#### Verification Word

All group members derive the same verification word independently:

```
counter_bytes = uint64_be(counter)
mac           = HMAC-SHA256(key=seed, data=counter_bytes)
index         = uint16_be(mac[0..2]) mod 2048
word          = wordlist[index]
```

Where:

- `seed` is the 32-byte group seed
- `counter` is `floor(unix_timestamp / rotation_interval)` plus any usage offset
- `uint16_be(mac[0..2])` interprets bytes 0 and 1 of the MAC as a big-endian 16-bit integer

#### Verification Phrase

For multi-word phrases (2 or 3 words), each word is derived from a consecutive 2-byte
slice of the same HMAC digest:

```
counter_bytes = uint64_be(counter)
mac           = HMAC-SHA256(key=seed, data=counter_bytes)
word_1        = wordlist[uint16_be(mac[0..2]) mod 2048]
word_2        = wordlist[uint16_be(mac[2..4]) mod 2048]
word_3        = wordlist[uint16_be(mac[4..6]) mod 2048]
```

A single HMAC call is sufficient for up to three words. Different 2-byte slices MAY
produce the same index; this is a valid output, not an error.

#### Duress Word

Each member has a unique duress word, independently derivable by all group members who
know both the group seed and the member's public key:

```
key           = seed || member_pubkey   (64 bytes: 32-byte seed concatenated with 32-byte pubkey)
counter_bytes = uint64_be(counter)
mac           = HMAC-SHA256(key=key, data=counter_bytes)
index         = uint16_be(mac[0..2]) mod 2048
duress        = wordlist[index]
```

Because all members know each other's public keys (from the group membership list), any
member can derive any other member's expected duress word. When a member says their duress
word instead of the verification word, the group MUST recognise it as a distress signal.

#### Collision Avoidance

If a member's duress word for a given counter is identical to the group verification word
for the same counter, the implementation MUST re-derive by appending the byte `0x01` to
the HMAC key:

```
key           = seed || member_pubkey || 0x01   (65 bytes)
counter_bytes = uint64_be(counter)
mac           = HMAC-SHA256(key=key, data=counter_bytes)
index         = uint16_be(mac[0..2]) mod 2048
duress        = wordlist[index]
```

Implementations MUST apply this check and re-derivation whenever computing a duress word.
The re-derivation MUST NOT be applied unless a collision is detected. A collision between
the re-derived duress word and the verification word is considered astronomically unlikely
and is not handled further.

### Counter Derivation

The time-based counter is:

```
counter = floor(unix_timestamp / rotation_interval)
```

After a burn-after-use event, the effective counter is:

```
counter = time_based_counter + usage_offset
```

Where `usage_offset` is the number of times the word has been burned within the current
time window. The `usage_offset` MUST be included in Word Used events (kind 28802) so all
members can advance in step.

### Verification Algorithm

When a group member hears another member respond to a word challenge, the verifier MUST
check responses in the following order:

1. If the response matches the current verification word (at the current counter):
   the member's identity is confirmed.

2. If the response does not match, derive the speaker's duress word for the current
   counter. If it matches: DURESS DETECTED. The verifier MUST act normally and MUST NOT
   alert the attacker. A silent duress event MUST be broadcast.

3. If neither matches, check the verification word at `counter - 1` (one window lookback)
   to handle members whose counter has fallen behind due to a missed burn event. If it
   matches: identity confirmed, but the member is out of synchronisation.

4. If none of the above match: verification failed.

### Burn-After-Use

When a word is used for verification:

1. The verifying member broadcasts a Word Used event (kind 28802) with the new counter
   value.
2. All members who receive the event MUST advance their local counter to
   `max(local_counter + 1, time_based_counter)`.
3. Members who miss the Word Used event will resynchronise automatically at the next
   natural time rotation.

## Event Kinds

This NIP defines five new event kinds. Kind numbers 38800–38801 are replaceable events
(NIP-16 convention for `d`-tagged replaceable events in the 30000–39999 range). Kind
numbers 28800–28802 are ephemeral events (NIP-16 convention for ephemeral events in the
20000–29999 range).

```
Kind 38800  Wordchain Group         Replaceable
Kind 28800  Seed Distribution       Ephemeral
Kind 38801  Member Update           Replaceable
Kind 28801  Re-seed                 Ephemeral
Kind 28802  Word Used               Ephemeral
```

### Kind 38800: Wordchain Group

Published by the group creator. This is the group's permanent, addressable record.
Clients MUST use the `d` tag value as the group identifier throughout the group's
lifetime.

```json
{
  "kind": 38800,
  "content": "<NIP-44 encrypted group config>",
  "tags": [
    ["d", "<group-identifier>"],
    ["name", "<human-readable group name>"],
    ["p", "<member-1-pubkey>"],
    ["p", "<member-2-pubkey>"],
    ["p", "<member-3-pubkey>"],
    ["rotation", "604800"],
    ["words", "1"],
    ["wordlist", "en-v1"],
    ["expiration", "<unix timestamp>"]
  ]
}
```

Tag definitions:

| Tag          | Required | Description                                                                      |
|--------------|----------|----------------------------------------------------------------------------------|
| `d`          | MUST     | Unique group identifier; used as the replaceable event address                   |
| `name`       | SHOULD   | Human-readable group name (unencrypted — visible to relays)                      |
| `p`          | MUST     | Member public keys, one tag per member; visible to relays for delivery routing   |
| `rotation`   | MUST     | Rotation interval in seconds (e.g. `"604800"` for 7 days)                       |
| `words`      | MUST     | Number of words per verification phrase: `"1"`, `"2"`, or `"3"`                 |
| `wordlist`   | MUST     | Wordlist identifier (e.g. `"en-v1"`)                                             |
| `expiration` | SHOULD   | NIP-40 expiration timestamp — group auto-dissolves after this time               |

The encrypted `content` MUST be a NIP-44 encrypted JSON object containing:

```json
{
  "description": "<creator-defined group description>",
  "policies": {
    "invite_by": "creator",
    "reseed_by": "creator"
  }
}
```

### Kind 28800: Seed Distribution

Delivers the group seed to a specific member. The `content` MUST be encrypted with
NIP-44 to the recipient's public key. This event MUST be published as an ephemeral event
and SHOULD be deleted from relays after the recipient has confirmed receipt (at the
application layer).

```json
{
  "kind": 28800,
  "content": "<NIP-44 encrypted payload>",
  "tags": [
    ["p", "<recipient-pubkey>"],
    ["e", "<group-event-id>"]
  ]
}
```

The encrypted payload MUST be a JSON object with the following fields:

```json
{
  "seed": "<256-bit hex-encoded group seed>",
  "counter_offset": 0,
  "group_d": "<group d-tag value>"
}
```

The `counter_offset` field allows re-seeding mid-window without waiting for the next
natural time rotation. It MUST be added to the time-based counter when deriving words
after a re-seed.

### Kind 38801: Member Update

Published by the group creator to record a membership change. Clients MUST treat this as
authoritative; the embedded `p` tag reflects the affected member.

```json
{
  "kind": 38801,
  "content": "<NIP-44 encrypted reason>",
  "tags": [
    ["d", "<group-identifier>"],
    ["action", "add"],
    ["p", "<affected-member-pubkey>"],
    ["reseed", "false"]
  ]
}
```

The `action` tag MUST be either `"add"` or `"remove"`.

When `action` is `"remove"`, the `reseed` tag MUST be `"true"`. The creator MUST publish
new Seed Distribution events (kind 28800) to all remaining members with a freshly
generated seed immediately after publishing the Member Update event. The removed member
MUST NOT receive a new seed distribution.

When `action` is `"add"`, the creator MUST publish a Seed Distribution event (kind 28800)
to the new member containing the current group seed.

### Kind 28801: Re-seed

Signals that a re-seed is in progress. Individual seed deliveries follow as kind 28800
events addressed to each remaining member.

```json
{
  "kind": 28801,
  "content": "<NIP-44 encrypted reason>",
  "tags": [
    ["e", "<group-event-id>"],
    ["reason", "member_removed"]
  ]
}
```

The `reason` tag MUST be one of: `"member_removed"`, `"compromise"`, `"scheduled"`,
`"duress"`.

The encrypted `content` MAY contain additional human-readable context for group members.

### Kind 28802: Word Used

Signals that the current word was used for verification. All members who receive this
event MUST advance their local counter.

```json
{
  "kind": 28802,
  "content": "<NIP-44 encrypted payload>",
  "tags": [
    ["e", "<group-event-id>"]
  ]
}
```

The encrypted payload MUST be a JSON object with the following fields:

```json
{
  "new_counter": 12346,
  "used_by": "<pubkey of member who triggered the advancement>",
  "duress": false
}
```

When `duress` is `true`, this event signals that a duress word was detected. The
`used_by` field identifies the member who said the duress word. Clients MUST handle this
event silently — they MUST NOT display any visible indication that could alert an attacker
monitoring the compromised member's device. Clients SHOULD initiate an automatic re-seed
(kind 28801) excluding the compromised member.

## Group Lifecycle

### Creation

1. Creator generates a cryptographically random 256-bit group seed.
2. Creator publishes a Wordchain Group event (kind 38800) naming all initial members.
3. Creator publishes Seed Distribution events (kind 28800) to each member, individually
   encrypted with NIP-44 to their public key.

### Active Use

Members independently derive the current verification word from the shared seed and the
current counter. No network is required for derivation. When a word is used:

1. The verifying member broadcasts a Word Used event (kind 28802).
2. All members advance their counter.

### Member Removal

1. Creator publishes a Member Update event (kind 38801) with `action=remove`.
2. Creator immediately generates a new group seed.
3. Creator publishes a Re-seed event (kind 28801) with `reason=member_removed`.
4. Creator publishes Seed Distribution events (kind 28800) to all remaining members.
5. The removed member's counter knowledge becomes worthless — they cannot derive future
   words from the new seed.

### Member Addition

1. Creator publishes a Member Update event (kind 38801) with `action=add`.
2. Creator publishes a Seed Distribution event (kind 28800) to the new member with the
   current seed. A re-seed is NOT required for member addition.

### Duress Detection

1. Verifier detects a duress word (see Verification Algorithm above).
2. Verifier broadcasts a Word Used event (kind 28802) with `duress=true`.
3. Clients handle this silently. The verifier acts normally to avoid alerting the attacker.
4. Creator (or any authorised member) initiates a re-seed (kind 28801) with
   `reason=duress`, excluding the compromised member.

### Dissolution

A group is dissolved when the creator publishes a Member Update event removing all
members, or when the group's NIP-40 `expiration` timestamp is reached. Clients MUST wipe
the group seed from local storage upon dissolution.

## Duress Protocol

### Detection Algorithm

```
function verify_response(spoken_word, seed, members, counter):

    verification = derive_verification_word(seed, counter)

    if spoken_word == verification:
        return { status: "verified" }

    for member_pubkey in members:
        duress = derive_duress_word(seed, member_pubkey, counter)
        if spoken_word == duress:
            return { status: "duress", member: member_pubkey }

    previous = derive_verification_word(seed, counter - 1)
    if spoken_word == previous:
        return { status: "verified_stale" }

    return { status: "failed" }
```

### Deniability Properties

The duress word is indistinguishable from a wrong answer to any party that does not hold
the group seed:

- An attacker who coerces a member into saying "the code word" hears a plausible word
  from the wordlist.
- The attacker has no way to verify whether it is the verification word or the duress word
  without the group seed.
- If the attacker demands to hear the "real" word, the member can assert that the duress
  word is the real word. The attacker cannot refute this claim.

### Limitations

- If the attacker has compromised the member's device AND obtained the group seed, they
  can derive both the verification word and the duress word. At this point, the device is
  the weakest link, not the protocol.
- If the attacker knows the Wordchain protocol exists and demands the member display the
  application, the member would expose the verification word. Implementations SHOULD NOT
  display the duress word in the default UI. The duress word SHOULD be derived on demand
  only, and SHOULD be accessible only through a non-obvious secondary gesture.

## Transport Layers

Word derivation is entirely local. Network transport is used only for counter
synchronisation (burn events), seed distribution, and group management.

### Nostr (Primary)

All five event kinds are published to one or more Nostr relays. Relay selection is left
to application implementations. Members MUST subscribe to group events filtered by the
group `d` tag and their own `p` tag to receive events addressed to them.

NIP-44 encryption is used throughout. Relays see group membership metadata (public keys
in `p` tags) but MUST NOT have access to the seed, words, or reason text.

### Meshtastic (Fallback)

When Nostr relays are unavailable, a wordchain group MAY operate over Meshtastic mesh
radio. Each group maps to a Meshtastic channel with a PSK derived as follows:

```
channel_psk = HMAC-SHA256(key=group_seed, data="meshtastic-channel-key")
```

Message types over Meshtastic:

| Message type       | Behaviour                                                                     |
|--------------------|-------------------------------------------------------------------------------|
| Seed distribution  | Encrypted to channel PSK. Used during in-person setup or when Nostr is down. |
| Word Used signal   | Encrypted broadcast. Compact format: `{"u":<new_counter>}`                   |
| Duress alert       | Encrypted broadcast. Compact format: `{"d":"<first 8 hex chars of pubkey>"}` |
| Group management   | NOT supported over Meshtastic — use Nostr or in-person exchange.              |

### In-Person (Last Resort)

For initial seed exchange or emergency re-seeding when both Nostr and Meshtastic are
unavailable, an implementation MAY present the encrypted seed payload as a QR code for
scanning by the recipient's device. The QR code payload MUST be a NIP-44 encrypted Seed
Distribution payload (as defined for kind 28800 above). This mechanism works fully
offline.

## Wordlist Specification

### Requirements

Words MUST be:

- Between 3 and 8 characters in length (inclusive)
- Unambiguous when spoken aloud
- Phonetically distinct from every other word in the list
- Free of offensive meanings in major languages
- Easy to pronounce across common English accents

Words MUST NOT be:

- Homophones of other words in the list (e.g. there/their, right/write)
- Within 2 phonetic edits of another list word (e.g. cat/bat, pen/ten)
- Confusable over degraded audio channels (e.g. ship/chip, thin/fin)
- Emotionally charged words that could cause alarm if overheard (e.g. bomb, kill, death)

### Format

The wordlist is a plain text file, one word per line, with exactly 2048 entries. Lines are
numbered 0 through 2047. The word at line N is `wordlist[N]`.

### Canonical English Wordlist (en-v1)

The canonical English wordlist (`en-v1`) begins from the BIP-39 English wordlist (2048
words) with the following modifications applied:

1. Remove all words that fail the spoken-clarity requirements above.
2. Replace removed words with words from a supplementary spoken-word corpus.
3. Validate the complete list against phonetic distance metrics.

The full `en-v1` wordlist is defined in Appendix A. Any implementation claiming
compliance with this NIP MUST use the exact wordlist defined in Appendix A.

## Security Considerations

### Threat Model

| Threat                                         | Mitigation                                                                                      |
|------------------------------------------------|-------------------------------------------------------------------------------------------------|
| AI voice/video clone calls a family member     | Verification word challenge — the clone does not know the current word                         |
| Attacker coerces a member to reveal the word   | Duress word alerts the group silently; attacker cannot distinguish it from the correct word     |
| Attacker intercepts Nostr events               | NIP-44 encryption throughout — seed and words never appear in plaintext on the relay           |
| Member device is compromised                   | Re-seed immediately; exclude the compromised member from the new seed distribution             |
| Relay operator collusion                       | Group membership (public keys) is visible; seed and word content are never on the relay        |
| Meshtastic eavesdropping                       | Channel PSK derived from group seed — decryption requires the seed                             |
| Wordlist brute force during a real-time call   | 11 bits per word (1 in 2048). An attacker on a live call gets one attempt.                     |

### Entropy Analysis

- Single word: 11 bits (1 in 2048). Adequate for real-time phone-call verification where
  the attacker has one attempt.
- Two words: 22 bits (1 in approximately 4,194,304). Recommended for higher-security
  groups.
- Three words: 33 bits (1 in approximately 8,589,934,592). Maximum configuration.

Wordchain is designed to protect against real-time impersonation, not offline brute force.
An attacker on a live call gets one attempt. Entropy requirements are therefore far lower
than for passwords or keys.

### Seed Storage

The group seed MUST be stored securely on member devices:

- Encrypted at rest using the platform keychain or secure enclave where available
- Never exported in plaintext after initial receipt
- Wiped from storage on group dissolution
- Protected by device authentication (PIN or biometric) before the application displays
  any derived word

## Dependencies

- **NIP-44**: Versioned encryption (used for all event `content` fields and for seed
  distribution payloads)
- **NIP-40**: Expiration tags (used for group auto-dissolution and ephemeral event
  expiry)

## Test Vectors

The following vectors define the canonical expected outputs for known inputs. Any
implementation claiming compliance with this NIP MUST produce identical results.

All seeds and public keys are hex-encoded 32-byte values. Counters are unsigned 64-bit
integers. Words are from the `en-v1` wordlist.

### Derivation Algorithm Summary

```
verification:
  mac   = HMAC-SHA256(key=seed, data=uint64_be(counter))
  index = uint16_be(mac[0:2]) mod 2048
  word  = wordlist[index]

duress:
  key   = seed || pubkey  (64 bytes)
  mac   = HMAC-SHA256(key=key, data=uint64_be(counter))
  index = uint16_be(mac[0:2]) mod 2048
  word  = wordlist[index]
  if word == verification_word:
    key   = seed || pubkey || 0x01  (65 bytes)
    mac   = HMAC-SHA256(key=key, data=uint64_be(counter))
    index = uint16_be(mac[0:2]) mod 2048
    word  = wordlist[index]
```

### Inputs

```
SEED_1   = 0000000000000000000000000000000000000000000000000000000000000001
SEED_2   = ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
PUBKEY_A = 0000000000000000000000000000000000000000000000000000000000000002
PUBKEY_B = 0000000000000000000000000000000000000000000000000000000000000003
```

### Vector Table

| # | Function              | Seed   | Pubkey  | Counter | Expected output         |
|---|-----------------------|--------|---------|---------|-------------------------|
| 1 | verification word     | SEED_1 | —       | 0       | `garnet`                |
| 2 | verification word     | SEED_1 | —       | 1       | `twice`                 |
| 3 | verification word     | SEED_2 | —       | 0       | `gossip`                |
| 4 | verification word     | SEED_1 | —       | 100     | `treat`                 |
| 5 | verification phrase   | SEED_1 | —       | 0       | `["garnet", "inject"]`  |
| 6 | verification phrase   | SEED_1 | —       | 0       | `["garnet", "inject", "garnet"]` |
| 7 | duress word           | SEED_1 | PUBKEY_A | 0      | `theory`                |
| 8 | duress word           | SEED_1 | PUBKEY_B | 0      | `cedar`                 |

Notes:

- Vector 5 uses `words=2`. The first word is derived from `mac[0:2]`, the second from
  `mac[2:4]`.
- Vector 6 uses `words=3`. Bytes 0–1 and bytes 4–5 of the digest produce the same index
  for this input; `["garnet", "inject", "garnet"]` is the correct output, not an error.
- Vector 7: PUBKEY_A's duress word (`theory`) is distinct from the verification word
  (`garnet`) — no collision re-derivation is needed.
- Vector 8: PUBKEY_B's duress word (`cedar`) is distinct from the verification word
  (`garnet`) — no collision re-derivation is needed.

### Round-Trip Verification

| # | Input word | Seed   | Members           | Counter | Expected status | Expected member |
|---|------------|--------|-------------------|---------|-----------------|-----------------|
| 9 | `garnet`   | SEED_1 | [PUBKEY_A, PUBKEY_B] | 0    | `verified`      | —               |
| 10 | `theory`  | SEED_1 | [PUBKEY_A, PUBKEY_B] | 0    | `duress`        | PUBKEY_A        |

## Appendix A: English Wordlist (en-v1)

The canonical `en-v1` wordlist is maintained in the reference implementation repository
and distributed with the `wordchain` npm package. Implementations MUST use this exact
list without modification. The wordlist file is named `en-v1.txt`, contains exactly 2048
entries, one word per line, words ordered alphabetically, UTF-8 encoding, Unix line
endings.

Reference: `https://github.com/TheCryptoDonkey/wordchain` — `src/wordlists/en-v1.txt`

## Reference Implementation

TypeScript: `wordchain` (npm)

```
npm install wordchain
```

Source: `https://github.com/TheCryptoDonkey/wordchain`
