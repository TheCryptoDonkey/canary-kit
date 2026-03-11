# CANARY Protocol Conformance Suite

A language-independent set of test vectors for validating any implementation of the CANARY protocol. Intended for developers porting canary-kit to Kotlin, Swift, Rust, Python, or any other language.

---

## Quick Start

1. **Load `vectors.json`** — parse the JSON file. Each top-level key is a test section (e.g. `derive`, `duress`, `liveness`, `beacon`). Each section contains an `inputs` lookup table and an array of `vectors`.
2. **Verify the wordlist checksum** — compute SHA-256 over the raw bytes of `wordlist-en-v1.txt` and compare against `vectors.json > wordlist.sha256`. See [Wordlist Integrity](#wordlist-integrity) for normalisation rules.
3. **Run each vector** — for every vector in every section, feed the referenced inputs into your implementation and assert that the output matches the expected value.

---

## Algorithm Pseudocode

### CANARY-DERIVE

Derives a token (word, PIN, or hex) from a secret and context at a given counter value.

```
function canary_derive(secret, context, counter):
  data = utf8(context) || counter_be32(counter)
  bytes = HMAC-SHA256(secret, data)
  return encode(bytes)
```

Where `counter_be32(n)` serialises `n` as a 4-byte big-endian unsigned integer.

---

### CANARY-DURESS

Derives a duress token that is guaranteed not to collide with any normal token within the tolerance window.

```
function canary_duress(secret, context, identity, counter, maxTolerance):
  duress_data = utf8(context + ":duress") || 0x00 || utf8(identity) || counter_be32(counter)
  bytes = HMAC-SHA256(secret, duress_data)
  token = encode(bytes)

  forbidden = canary_derive for all c in [max(0, counter - 2*maxTolerance) .. counter + 2*maxTolerance]
  if token not in forbidden: return token

  for suffix in 0x01 .. 0xFF:
    bytes = HMAC-SHA256(secret, duress_data || byte(suffix))
    token = encode(bytes)
    if token not in forbidden: return token

  raise "duress collision unresolvable"
```

See [Collision Avoidance Algorithm](#collision-avoidance-algorithm) for the full specification.

---

### Liveness

Derives a liveness token bound to an identity string.

```
function canary_liveness(secret, context, identity, counter):
  data = utf8(context + ":alive") || 0x00 || utf8(identity) || counter_be32(counter)
  bytes = HMAC-SHA256(secret, data)
  return encode(bytes)
```

---

### Beacon Key

Derives a beacon key from a seed (provided as a hex string).

```
function canary_beacon_key(seed_hex):
  seed_bytes = hex_to_bytes(seed_hex)
  bytes = HMAC-SHA256(seed_bytes, utf8("canary:beacon:key"))
  return bytes
```

---

### Counter

```
function current_counter(timestamp_seconds, interval_seconds):
  return floor(timestamp_seconds / interval_seconds)
```

---

## Encoding Rules

Given the raw HMAC-SHA256 output bytes:

| Output type | Derivation |
|-------------|-----------|
| **Word** (1 word) | `uint16_be(bytes[0:2]) mod 2048` → 0-based index into wordlist |
| **Phrase** (N words) | Consecutive 2-byte windows: bytes 0–1 → word 1, bytes 2–3 → word 2, bytes 4–5 → word 3, … Space-separated. |
| **PIN** | `uint16_be(bytes[0:2]) mod 10^digits`, zero-padded to `digits` characters |
| **Hex** | Lowercase hexadecimal of the full 32-byte HMAC output |

`uint16_be(b)` is `(b[0] << 8) | b[1]` — big-endian unsigned 16-bit integer.

---

## Counter Serialisation

CANARY-DERIVE, CANARY-DURESS, and liveness all consume the counter as a **4-byte big-endian unsigned integer (BE32)** appended directly to the HMAC message.

The `counterToBytes()` utility in some implementations uses **8-byte big-endian (BE64, RFC 6238 TOTP style)**. This is **not** part of the derivation pipeline — it exists solely for external TOTP-compatible integrations. Do not use BE64 when implementing the core derivation functions.

---

## Collision Avoidance Algorithm

CANARY-DURESS must not produce a token that an observer could mistake for a normal token. The algorithm builds a forbidden set spanning the full counter drift window, then attempts the raw duress derivation. If a collision occurs, it appends a single-byte suffix (0x01–0xFF) to the HMAC input and retries.

```
forbidden = {}
for c in max(0, counter - 2*maxTolerance) .. counter + 2*maxTolerance:
  forbidden.add(canary_derive(secret, context, c))

duress_data = utf8(context + ":duress") || 0x00 || utf8(identity) || counter_be32(counter)
duress_bytes = HMAC-SHA256(secret, duress_data)
token = encode(duress_bytes)

if token not in forbidden:
  return token

for suffix in 0x01 .. 0xFF:
  duress_bytes = HMAC-SHA256(secret, duress_data || byte(suffix))
  token = encode(duress_bytes)
  if token not in forbidden:
    return token

raise "duress collision unresolvable after 255 attempts"
```

The forbidden set uses **2× maxTolerance** in each direction to account for worst-case counter drift between the deriver and the verifier. If the verifier's counter is ahead by up to `maxTolerance` steps and the deriver's is behind by up to `maxTolerance` steps (or vice versa), the full window is `4 * maxTolerance + 1` counters wide.

---

## Wordlist Integrity

The SHA-256 checksum stored in `vectors.json` under `wordlist.sha256` is computed over the **raw file bytes** of `wordlist-en-v1.txt` using UTF-8 encoding and **LF line endings**.

Implementations on Windows must normalise CRLF → LF before hashing (i.e. replace `\r\n` with `\n` throughout the file content before computing the digest).

The file contains one word per line with **no trailing newline** after the final entry.

---

## vectors.json Schema

```
{
  "wordlist": {
    "file": "wordlist-en-v1.txt",
    "sha256": "<64-char hex>"
  },
  "<section>": {
    "inputs": {
      "<key>": <value>,
      ...
    },
    "vectors": [
      {
        "<param>": "<input_key>",  // references inputs by key
        "expected": "<output>"
      },
      ...
    ]
  }
}
```

The `inputs` object is a **named lookup table**. Vector entries reference inputs by key rather than embedding values directly — for example, `"seed": "seed_1"` means look up `inputs.seed_1` and use that value as the `seed` argument.

All hex strings are full-length: 64 characters for 32-byte (256-bit) values. Numeric values (counter, interval, digits, maxTolerance) are JSON numbers.
