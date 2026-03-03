NIP-CANARY
==========

NIP-CANARY: Coercion-Resistant Spoken Verification Protocol
------------------------------------------------------------

`draft` `optional`

## Abstract

CANARY is a protocol for coercion-resistant spoken verification. It combines deterministic
token derivation (like TOTP) with duress signalling and human-spoken output — three
properties that exist independently but have never been combined in a single standard.

The protocol is defined in three layers:

1. **CANARY-DERIVE** — Deterministic token derivation from a shared secret, context string,
   and counter
2. **CANARY-DURESS** — Coercion-resistant alternate tokens and dead man's switch (liveness
   monitoring)
3. **CANARY-WORDLIST** — Spoken-word encoding optimised for voice clarity

The protocol is platform-agnostic — no Nostr, no cryptocurrency, no transport assumptions.
This NIP defines both the universal protocol and a Nostr transport binding for group
management, seed distribution, and counter synchronisation.

## Motivation

AI voice cloning now requires as little as three seconds of audio. A thirty-second clip
and thirty minutes of work can produce a convincing clone. The security advice is already
widespread — "agree on a family safe word" — but common implementations are dangerously
naive:

- Static words that never rotate (one compromise burns the word forever)
- Human-chosen words with low entropy (predictable and guessable)
- No duress signalling (if a member is forced to reveal the word, there is no silent alarm)
- No protocol (just "remember a word" — no tooling, no synchronisation, no offline support)

Existing standards each solve part of the problem but not all of it:

| Standard       | Rotating tokens | Coercion resistance | Human-spoken output |
|----------------|:---------------:|:-------------------:|:-------------------:|
| TOTP (RFC 6238)| Yes             | No                  | No                  |
| HOTP (RFC 4226)| Yes             | No                  | No                  |
| SAS (ZRTP)     | No              | No                  | Yes                 |
| BIP-39         | No              | No                  | Yes                 |
| **CANARY**     | **Yes**         | **Yes**             | **Yes**             |

CANARY solves all of these by combining well-understood cryptographic primitives
(HMAC-SHA256, counters, wordlists) into a single protocol with coercion resistance as a
first-class property.

## Terminology

| Term               | Definition                                                                                     |
|--------------------|------------------------------------------------------------------------------------------------|
| Secret             | A 256-bit (32-byte) shared key known to all verifying parties                                  |
| Context            | A UTF-8 string identifying the derivation purpose (e.g. `"canary:verify"`, `"trott:handoff"`) |
| Counter            | An unsigned integer determining the current token; scheme is application-defined                |
| Identity           | A UTF-8 string identifying a specific person (pubkey, username, employee ID, etc.)             |
| Verification token | The current group token, derived from secret + context + counter                               |
| Duress token       | A person's coercion token, derived from secret + context + identity + counter                  |
| Liveness token     | A heartbeat token proving "I am alive and hold the secret"                                     |
| Encoding           | Output format: words, PIN, or hex                                                              |
| Wordlist           | A curated list of exactly 2048 words optimised for spoken clarity                              |
| Burn-after-use     | Advancing the counter early after a token is used for verification                             |

---

## CANARY-DERIVE

Core deterministic token derivation. The universal primitive that all other layers build on.

### Algorithm

```
token_bytes = HMAC-SHA256(secret, utf8(context) || counter_be32)
```

Where:

- `secret` — 256-bit (32-byte) shared key
- `context` — UTF-8 encoded string identifying the derivation purpose
- `counter_be32` — 4-byte big-endian unsigned integer
- Output: 32 bytes (256 bits), truncated and encoded per the output format

The `context` string ensures the same secret can derive different tokens for different
purposes without collision. For example, `"canary:verify"` and `"trott:handoff"` produce
entirely independent token sequences from the same secret.

### Counter Schemes

The protocol does not mandate a specific counter scheme. Implementations choose one or
more based on their use case:

| Scheme          | Counter value                       | Use case                                |
|-----------------|-------------------------------------|-----------------------------------------|
| **Time-based**  | `floor(unix_time / period)`         | Canary groups (7d), Signet (30s)        |
| **Sequence**    | Monotonic integer                   | Burn-after-use, one-time tokens         |
| **Event-based** | Deterministic from event ID         | TROTT (hash of task ID)                 |

### Tolerance Window

Verifiers SHOULD accept tokens within `±tolerance` counter values to handle clock skew
and latency. The tolerance value is application-defined (e.g. Signet: ±1 epoch,
canary-kit groups: 0).

### Output Encodings

The encoding is a presentation layer, not part of the derivation. The same `token_bytes`
can be rendered in multiple formats:

| Format    | Encoding                                                 | Example                       |
|-----------|----------------------------------------------------------|-------------------------------|
| **Words** | `uint16_be(bytes[i*2..i*2+2]) mod 2048` → wordlist      | `net`, `throw drafter category` |
| **PIN**   | First N bytes as big-endian integer, mod 10^digits       | `2796`                        |
| **Hex**   | Lowercase hex pairs, truncated to length                 | `c51524053f1f27a4`            |

#### Word Encoding

Each word consumes 2 bytes (16 bits) from the token, reduced modulo the wordlist size
(2048 = 11 effective bits per word):

```
for i in 0..word_count:
    index = uint16_be(token_bytes[i*2 .. i*2+2]) mod 2048
    words[i] = wordlist[index]
```

A single HMAC-SHA256 output (32 bytes) provides enough material for up to 16 words.

#### PIN Encoding

The first `ceil(digits × 0.415)` bytes are interpreted as a big-endian integer, reduced
modulo `10^digits`, zero-padded to the requested length:

```
value = big_endian_int(token_bytes[0..N])
pin   = (value mod 10^digits), zero-padded to `digits` characters
```

### Token Length and Security

More output = more security, harder to speak:

| Format       | Bits  | Possibilities | Use case                         |
|--------------|-------|---------------|----------------------------------|
| 1 word       | ~11   | ~2,048        | Casual verification, voice call  |
| 2–3 words    | ~22–33| ~4M–8B        | Group identity, high-security    |
| 4-digit PIN  | ~13.3 | 10,000        | Quick handoff (TROTT)            |
| 6-digit code | ~19.9 | 1,000,000     | TOTP-equivalent                  |

---

## CANARY-DURESS

Coercion resistance and liveness monitoring. The differentiator from existing standards.

### Active Duress — Token Derivation

Each identity has a unique duress token, derived independently from the verification
token:

```
duress_bytes = HMAC-SHA256(secret, utf8(context + ":duress") || utf8(identity) || counter_be32)
```

Where:

- `context + ":duress"` — the verification context with `":duress"` appended
- `identity` — UTF-8 encoded identifier (pubkey, username, employee ID)
- Same `counter` as the verification token

**Key property:** The duress token is computationally independent from the verification
token. An attacker who knows one cannot derive the other. But a verifier with the shared
secret can check for both.

### Collision Avoidance

If the duress token, after encoding, is identical to the verification token at the same
counter, the implementation MUST re-derive by appending the byte `0x01` to the HMAC
data:

```
duress_bytes = HMAC-SHA256(secret, utf8(context + ":duress") || utf8(identity) || counter_be32 || 0x01)
```

Collision avoidance operates at the encoding level, not the byte level, because different
byte arrays can encode to the same output via modulo reduction. Implementations MUST
apply this check whenever computing a duress token. A collision between the re-derived
duress token and the verification token is considered astronomically unlikely and is not
handled further.

### Verification Flow

```
verify(secret, context, counter, input, identities[], tolerance?) ->
  { status: 'valid' } |
  { status: 'duress', identity: string } |
  { status: 'invalid' }
```

The verification algorithm checks in order:

1. For each counter in `[counter - tolerance, ..., counter + tolerance]`:
   derive the verification token. If the input matches → `valid`.

2. For each identity, for each counter in the tolerance window:
   derive the duress token. If the input matches → `duress` with the matching identity.

3. No match → `invalid`.

### Deniability Properties

The duress token is indistinguishable from a wrong answer to any party that does not hold
the shared secret:

- An attacker hears a plausible word from the wordlist (or a plausible PIN).
- The attacker cannot verify whether it is the verification token or the duress token
  without the shared secret.
- If the attacker demands the "real" token, the member can assert that the duress token
  is the real token. The attacker cannot refute this.

### Limitations

- If the attacker has compromised the member's device AND obtained the shared secret, they
  can derive both the verification token and the duress token. At this point, the device is
  the weakest link, not the protocol.
- If the attacker knows the CANARY protocol exists and demands the member display the
  application, the member would expose the verification token. Implementations SHOULD NOT
  display the duress token in the default UI. The duress token SHOULD be accessible only
  through a non-obvious secondary gesture.

### Passive Duress — Dead Man's Switch

The protocol defines a liveness token for heartbeat-based absence detection:

```
liveness_bytes = HMAC-SHA256(secret, utf8(context + ":alive") || utf8(identity) || counter_be32)
```

The liveness token proves both identity and knowledge of the secret — not just a ping.

Liveness monitoring parameters are application-defined:

| Parameter            | Description                                     | Example     |
|----------------------|-------------------------------------------------|-------------|
| `heartbeat_interval` | Expected time between liveness proofs           | 300s, 30s   |
| `grace_period`       | Time after missed heartbeat before DMS triggers | 2× interval |

**DMS trigger actions** are implementation-specific:

| Implementation | Action on DMS trigger                               |
|----------------|-----------------------------------------------------|
| Canary-kit     | Alert the group with last known location            |
| Signet         | Lock signing keys, broadcast revocation             |
| TROTT          | Escalate to dispatch, freeze escrow                 |
| Banking        | Freeze account, alert fraud team                    |

---

## CANARY-WORDLIST

Spoken-word encoding optimised for voice clarity.

### Encoding Scheme

- 2048 words = 11 bits per word
- Token bytes split into 2-byte chunks, each mapped to a word index via
  `uint16_be mod 2048`
- 1 word = ~11 bits, 2 words = ~22 bits, 3 words = ~33 bits

### Phonetic Clarity Criteria

Wordlists MUST satisfy:

1. **No homophones** — words must sound distinct (`write` vs `right` excluded)
2. **Distinct first syllable** — listeners can identify the word early
3. **Cross-accent pronounceable** — works across major accent families
4. **No offensive words** — culturally appropriate across contexts
5. **Single-word only** — no compounds, no hyphens
6. **4–8 letters preferred** — short enough to speak, long enough to be distinct

### Reference Wordlist

`en-v1` — 2048-word English wordlist curated from BIP-39 with additional phonetic
filtering. Maintained in the `canary-kit` reference implementation.

### Internationalisation

Other languages can propose wordlists following the same criteria. Each list is identified
by a locale tag (`es-v1`, `fr-v1`, `ja-v1`). The protocol does not mandate a specific
language.

---

## Nostr Canary Groups

This section defines a Nostr application layer built on the CANARY protocol, providing
group management, seed distribution, and counter synchronisation over Nostr relays.

Nostr canary groups use a specific instantiation of the CANARY protocol with time-based
counters and Nostr public keys as member identities.

### Group Derivation Scheme

The Nostr group scheme uses 64-bit counter encoding and the group seed directly as the
HMAC key (without a context string), for simplicity in the single-purpose group setting:

#### Verification Word

```
counter_bytes = uint64_be(counter)
mac           = HMAC-SHA256(key=seed, data=counter_bytes)
index         = uint16_be(mac[0..2]) mod 2048
word          = wordlist[index]
```

Where:

- `seed` is the 32-byte group seed
- `counter` is `floor(unix_timestamp / rotation_interval)` plus any usage offset
- `uint16_be(mac[0..2])` interprets bytes 0 and 1 of the MAC as a big-endian 16-bit
  integer

#### Verification Phrase

For multi-word phrases (2 or 3 words), each word is derived from a consecutive 2-byte
slice of the same HMAC digest:

```
mac    = HMAC-SHA256(key=seed, data=uint64_be(counter))
word_1 = wordlist[uint16_be(mac[0..2]) mod 2048]
word_2 = wordlist[uint16_be(mac[2..4]) mod 2048]
word_3 = wordlist[uint16_be(mac[4..6]) mod 2048]
```

Different 2-byte slices MAY produce the same index; this is a valid output, not an error.

#### Duress Word

Each member has a unique duress word, using their Nostr public key as the identity:

```
key           = seed || member_pubkey   (64 bytes: 32-byte seed + 32-byte pubkey)
mac           = HMAC-SHA256(key=key, data=uint64_be(counter))
index         = uint16_be(mac[0..2]) mod 2048
duress        = wordlist[index]
```

If the duress word collides with the verification word for the same counter, re-derive
with `0x01` appended to the key (65 bytes).

### Counter Derivation

```
counter = floor(unix_timestamp / rotation_interval) + usage_offset
```

The `usage_offset` is the number of times the word has been burned within the current
time window. It MUST be included in Word Used events (kind 28802) so all members can
advance in step.

### Verification Algorithm

When verifying a spoken response:

1. If it matches the current verification word → identity confirmed.
2. Derive the speaker's duress word. If it matches → **DURESS DETECTED**. Act normally,
   broadcast silent duress event.
3. Check the verification word at `counter - 1` (one window lookback for stale counters).
   If it matches → identity confirmed, member out of sync.
4. Otherwise → verification failed.

### Burn-After-Use

When a word is used for verification:

1. The verifying member broadcasts a Word Used event (kind 28802) with the new counter.
2. All members advance their counter to `max(local_counter + 1, time_based_counter)`.
3. Members who miss the event resynchronise at the next natural time rotation.

## Event Kinds

This NIP defines five event kinds for Nostr transport. Kind numbers 38800–38801 are
replaceable events (NIP-16). Kind numbers 28800–28802 are ephemeral events (NIP-16).

```
Kind 38800  Canary Group              Replaceable
Kind 28800  Seed Distribution         Ephemeral
Kind 38801  Member Update             Replaceable
Kind 28801  Re-seed                   Ephemeral
Kind 28802  Word Used / Duress Alert  Ephemeral
```

### Kind 38800: Canary Group

Published by the group creator. The `d` tag value is the group identifier throughout the
group's lifetime.

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

| Tag          | Required | Description                                                        |
|--------------|----------|--------------------------------------------------------------------|
| `d`          | MUST     | Unique group identifier; replaceable event address                 |
| `name`       | SHOULD   | Human-readable group name (unencrypted — visible to relays)        |
| `p`          | MUST     | Member public keys, one tag per member                             |
| `rotation`   | MUST     | Rotation interval in seconds (e.g. `"604800"` for 7 days)         |
| `words`      | MUST     | Number of words per verification phrase: `"1"`, `"2"`, or `"3"`   |
| `wordlist`   | MUST     | Wordlist identifier (e.g. `"en-v1"`)                               |
| `expiration` | SHOULD   | NIP-40 expiration timestamp — group auto-dissolves after this time |

The encrypted `content` MUST be a NIP-44 encrypted JSON object:

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

Delivers the group seed to a specific member, encrypted with NIP-44.

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

Encrypted payload:

```json
{
  "seed": "<256-bit hex-encoded group seed>",
  "counter_offset": 0,
  "group_d": "<group d-tag value>"
}
```

The `counter_offset` allows re-seeding mid-window without waiting for the next natural
time rotation.

### Kind 38801: Member Update

Published by the group creator to record a membership change.

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

- `action` MUST be `"add"` or `"remove"`.
- When `action` is `"remove"`, `reseed` MUST be `"true"`. The creator MUST distribute a
  new seed to all remaining members immediately.
- When `action` is `"add"`, the creator distributes the current seed to the new member.

### Kind 28801: Re-seed

Signals that a re-seed is in progress. Individual seed deliveries follow as kind 28800
events.

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

### Kind 28802: Word Used / Duress Alert

Signals that the current word was used for verification, or that a duress word was
detected. All members who receive this event MUST advance their local counter.

```json
{
  "kind": 28802,
  "content": "<NIP-44 encrypted payload>",
  "tags": [
    ["e", "<group-event-id>"]
  ]
}
```

Encrypted payload:

```json
{
  "new_counter": 12346,
  "used_by": "<pubkey of member who triggered the advancement>",
  "duress": false
}
```

When `duress` is `true`, clients MUST handle this silently — they MUST NOT display any
visible indication that could alert an attacker. Clients SHOULD initiate an automatic
re-seed (kind 28801) with `reason=duress`.

## Group Lifecycle

### Creation

1. Creator generates a cryptographically random 256-bit group seed.
2. Creator publishes a Canary Group event (kind 38800) naming all initial members.
3. Creator publishes Seed Distribution events (kind 28800) to each member, encrypted
   with NIP-44.

### Active Use

Members independently derive the current verification word from the shared seed and
counter. No network is required for derivation. When a word is used:

1. The verifying member broadcasts a Word Used event (kind 28802).
2. All members advance their counter.

### Member Removal

1. Creator publishes a Member Update event (kind 38801) with `action=remove`.
2. Creator generates a new group seed.
3. Creator publishes a Re-seed event (kind 28801) with `reason=member_removed`.
4. Creator distributes the new seed to all remaining members (kind 28800).

### Member Addition

1. Creator publishes a Member Update event (kind 38801) with `action=add`.
2. Creator distributes the current seed to the new member (kind 28800). A re-seed is
   NOT required.

### Duress Detection

1. Verifier detects a duress word (see Verification Algorithm).
2. Verifier broadcasts a Word Used event (kind 28802) with `duress=true`.
3. Clients handle silently. The verifier acts normally to avoid alerting the attacker.
4. Creator initiates a re-seed (kind 28801) with `reason=duress`, excluding the
   compromised member.

### Dissolution

A group is dissolved when the creator removes all members, or when the NIP-40
`expiration` timestamp is reached. Clients MUST wipe the group seed from local storage
upon dissolution.

## Transport Layers

Word derivation is entirely local. Network transport is used only for counter
synchronisation, seed distribution, and group management.

### Nostr (Primary)

All event kinds are published to one or more Nostr relays. NIP-44 encryption throughout.
Relays see group membership metadata (public keys in `p` tags) but MUST NOT have access
to seeds, tokens, or reason text.

### Meshtastic (Fallback)

When Nostr relays are unavailable, a canary group MAY operate over Meshtastic mesh
radio with a channel PSK derived as:

```
channel_psk = HMAC-SHA256(key=group_seed, data="meshtastic-channel-key")
```

| Message type      | Format                                                         |
|-------------------|----------------------------------------------------------------|
| Seed distribution | Encrypted to channel PSK                                       |
| Word Used signal  | `{"u":<new_counter>}`                                         |
| Duress alert      | `{"d":"<first 8 hex chars of pubkey>"}`                       |
| Group management  | NOT supported — use Nostr or in-person exchange                |

### In-Person (Last Resort)

For initial seed exchange or emergency re-seeding, an implementation MAY present the
encrypted seed payload as a QR code for scanning. The QR payload MUST be a NIP-44
encrypted Seed Distribution payload. This mechanism works fully offline.

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
words) with the following modifications:

1. Remove all words that fail the spoken-clarity requirements above.
2. Replace removed words with words from a supplementary spoken-word corpus.
3. Validate the complete list against phonetic distance metrics.

The full `en-v1` wordlist is defined in Appendix A. Any implementation claiming
compliance with this NIP MUST use the exact wordlist defined in Appendix A.

## Security Considerations

### Threat Model

| Threat                           | TOTP | CANARY  | Mitigation                                               |
|----------------------------------|:----:|:-------:|----------------------------------------------------------|
| Impersonation                    | Yes  | Yes     | Verification token challenge                              |
| AI voice/video clone             | No   | Yes     | Shared secret — clone does not know the current token    |
| Coercion (forced auth)           | No   | **Yes** | Duress token alerts silently; attacker cannot distinguish|
| Replay attack                    | Yes  | Yes     | Counter rotation / burn-after-use                         |
| Absence detection                | No   | **Yes** | Liveness token / dead man's switch                       |
| Nostr event interception         | —    | Yes     | NIP-44 encryption throughout                              |
| Device compromise                | —    | Yes     | Re-seed immediately; exclude compromised member          |
| Wordlist brute force (live call) | —    | Yes     | 11 bits per word; attacker gets one attempt               |

### Entropy Analysis

- Single word: ~11 bits (1 in 2048). Adequate for real-time verification where the
  attacker has one attempt.
- Two words: ~22 bits (1 in ~4,194,304). Recommended for higher-security groups.
- Three words: ~33 bits (1 in ~8,589,934,592). Maximum word configuration.
- 4-digit PIN: ~13.3 bits (1 in 10,000). Quick handoff scenarios.
- 6-digit code: ~19.9 bits (1 in 1,000,000). TOTP-equivalent.

### Seed Storage

The shared secret MUST be stored securely on member devices:

- Encrypted at rest using the platform keychain or secure enclave where available
- Never exported in plaintext after initial receipt
- Wiped from storage on group dissolution
- Protected by device authentication (PIN or biometric) before displaying any derived
  token

## Test Vectors

### CANARY Protocol Vectors

The following vectors define canonical expected outputs for the universal CANARY protocol.
Any implementation claiming conformance MUST produce identical results.

**Inputs:**

```
SECRET   = 0000000000000000000000000000000000000000000000000000000000000001
CONTEXT  = canary:verify
IDENTITY = alice
```

**Algorithm:**

```
CANARY-DERIVE:
  token_bytes = HMAC-SHA256(hex_to_bytes(SECRET), utf8(CONTEXT) || counter_be32)

CANARY-DURESS:
  duress_bytes = HMAC-SHA256(hex_to_bytes(SECRET), utf8(CONTEXT + ":duress") || utf8(IDENTITY) || counter_be32)

Liveness:
  liveness_bytes = HMAC-SHA256(hex_to_bytes(SECRET), utf8(CONTEXT + ":alive") || utf8(IDENTITY) || counter_be32)
```

**Vector Table:**

| #  | Function           | Context          | Identity   | Counter | Encoding    | Expected output                                                    |
|----|--------------------|------------------|------------|---------|-------------|--------------------------------------------------------------------|
| 1  | deriveTokenBytes   | `canary:verify`  | —          | 0       | raw hex     | `c51524053f1f27a4c871c63069f285ce5ac5b69a40d6caa5af9b6945dd9556d1` |
| 2  | deriveToken        | `canary:verify`  | —          | 0       | 1 word      | `net`                                                              |
| 3  | deriveToken        | `canary:verify`  | —          | 1       | 1 word      | `famous`                                                           |
| 4  | deriveToken        | `trott:handoff`  | —          | 0       | 4-digit PIN | `2796`                                                             |
| 5  | deriveToken        | `signet:verify`  | —          | 0       | 3 words     | `throw drafter category`                                           |
| 6  | deriveDuressToken  | `canary:verify`  | `alice`    | 0       | 1 word      | `galley`                                                           |
| 7  | deriveDuressToken  | `trott:handoff`  | `rider123` | 0       | 4-digit PIN | `2269`                                                             |
| 8  | verifyToken        | `canary:verify`  | `alice`    | 0       | input: `net`   | `{ status: 'valid' }`                                           |
| 9  | verifyToken        | `canary:verify`  | `alice`    | 0       | input: `galley`| `{ status: 'duress', identity: 'alice' }`                       |
| 10 | deriveLivenessToken| `canary:verify`  | `alice`    | 0       | raw hex     | `bb36c42d8bd4c2a5bb48747d38414b672b55629c03e59757b9f73688d7ece82e` |

Notes:

- Vector 5 uses context `signet:verify`, demonstrating that the same secret derives
  independent tokens per context.
- Vector 6: `galley` is distinct from `net` — no collision re-derivation needed.
- Vector 7: `2269` is distinct from `2796` — no collision re-derivation needed.
- Vectors 8–9: Round-trip verification confirms correct classification of normal tokens
  as `valid` and duress tokens as `duress` with the correct identity.

### Nostr Group Vectors

The following vectors define canonical outputs for the Nostr canary group derivation
scheme. Seeds and public keys are hex-encoded 32-byte values. Counters are unsigned
64-bit integers. Words are from the `en-v1` wordlist.

**Inputs:**

```
SEED_1   = 0000000000000000000000000000000000000000000000000000000000000001
SEED_2   = ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
PUBKEY_A = 0000000000000000000000000000000000000000000000000000000000000002
PUBKEY_B = 0000000000000000000000000000000000000000000000000000000000000003
```

**Algorithm:**

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

**Vector Table:**

| #  | Function            | Seed   | Pubkey   | Counter | Expected output                  |
|----|---------------------|--------|----------|---------|----------------------------------|
| 1  | verification word   | SEED_1 | —        | 0       | `garnet`                         |
| 2  | verification word   | SEED_1 | —        | 1       | `twice`                          |
| 3  | verification word   | SEED_2 | —        | 0       | `gossip`                         |
| 4  | verification word   | SEED_1 | —        | 100     | `treat`                          |
| 5  | verification phrase | SEED_1 | —        | 0       | `["garnet", "inject"]`           |
| 6  | verification phrase | SEED_1 | —        | 0       | `["garnet", "inject", "garnet"]` |
| 7  | duress word         | SEED_1 | PUBKEY_A | 0       | `theory`                         |
| 8  | duress word         | SEED_1 | PUBKEY_B | 0       | `cedar`                          |

Notes:

- Vector 5 uses `words=2`. First word from `mac[0:2]`, second from `mac[2:4]`.
- Vector 6 uses `words=3`. Bytes 0–1 and 4–5 produce the same index; the repeated word
  is a correct output.
- Vectors 7–8: Duress words are distinct from the verification word (`garnet`) — no
  collision re-derivation needed.

**Round-Trip Verification:**

| #  | Input word | Seed   | Members              | Counter | Expected status | Expected member |
|----|------------|--------|----------------------|---------|-----------------|-----------------|
| 9  | `garnet`   | SEED_1 | [PUBKEY_A, PUBKEY_B] | 0       | `verified`      | —               |
| 10 | `theory`   | SEED_1 | [PUBKEY_A, PUBKEY_B] | 0       | `duress`        | PUBKEY_A        |

## Dependencies

- **NIP-44**: Versioned encryption (for all Nostr event `content` fields and seed
  distribution payloads)
- **NIP-40**: Expiration tags (for group auto-dissolution and ephemeral event expiry)

## Appendix A: English Wordlist (en-v1)

The canonical `en-v1` wordlist is maintained in the reference implementation repository
and distributed with the `canary-kit` npm package. Implementations MUST use this exact
list without modification. The wordlist file contains exactly 2048 entries, one word per
line, ordered alphabetically, UTF-8 encoding, Unix line endings.

Reference: `https://github.com/TheCryptoDonkey/canary-kit` — `src/wordlists/en-v1.txt`

## Reference Implementation

TypeScript: `canary-kit` (npm)

```
npm install canary-kit
```

### CANARY Protocol API

```typescript
import {
  deriveToken, deriveTokenBytes,
  deriveDuressToken, deriveDuressTokenBytes,
  verifyToken,
  deriveLivenessToken,
} from 'canary-kit/token'

import {
  encodeAsWords, encodeAsPin, encodeAsHex,
} from 'canary-kit/encoding'
```

### Nostr Group API

```typescript
import {
  createGroup, getCurrentWord, verifyWord,
  deriveDuressWord, deriveVerificationWord,
} from 'canary-kit'
```

Source: `https://github.com/TheCryptoDonkey/canary-kit`
