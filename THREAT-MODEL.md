# CANARY Threat Model

**Version:** 1.0
**Date:** 2026-03-06
**Scope:** CANARY protocol v1 (CANARY-DERIVE, CANARY-DURESS, CANARY-WORDLIST), NIP-CANARY Nostr binding, canary-kit reference implementation

## Scope

This threat model covers:
- The CANARY protocol specification ([CANARY.md](CANARY.md))
- The NIP-CANARY Nostr binding ([NIP-CANARY.md](NIP-CANARY.md))
- The Nostr transport layer ([NIP-XX.md](NIP-XX.md) — Simple Shared Secret Groups)
- The canary-kit TypeScript reference implementation (src/*.ts)

Out of scope: demo application (app/), build tooling, CI/CD, deployment infrastructure. Deployment concerns (HSM, key rotation, relay trust) are addressed in [INTEGRATION.md](INTEGRATION.md).

For regulatory mapping of properties P1–P8 against FCA, RBI, UAE TDRA, EU AI Act, eIDAS, and W3C Confidence Method, see [REGULATORY.md](REGULATORY.md).

## Adversary Profiles

### A1: Voice Cloner

**Capability:** AI-generated voice using as little as 3 seconds of audio. Access to social context (names, relationships, recent events). May have partial knowledge of the target's communication patterns.

**Goal:** Impersonate a group member on a voice call to extract information, authorise transactions, or gain physical access.

**Assumed knowledge:** Public information about the target. Does NOT have the shared secret, device access, or group membership.

### A2: Coerced Member

**Capability:** Legitimate group member under physical duress. Holds the shared secret on their device. May be forced to speak or show their screen.

**Goal:** Signal distress to other group members without the attacker detecting the signal. Must appear to cooperate normally from the attacker's perspective.

**Assumed knowledge:** Everything a legitimate member knows — seed, wordlist, counter, member list.

### A3: Compromised Device

**Capability:** Full read/write access to one member's device — filesystem, memory, keychain. Can extract the group seed, observe derived tokens, and inject state changes.

**Goal:** Extract the group seed, derive valid tokens for impersonation, escalate to full group compromise, persist access across reseeds.

**Assumed knowledge:** All data stored on the compromised device, including the group seed and any cached state.

### A4: Network Observer

**Capability:** Passive eavesdropper on the Nostr relay or any transport layer. Can observe all published events, metadata, and timing patterns. Cannot modify events in transit (passive only).

**Goal:** Correlate tokens across sessions, identify group membership from metadata, replay captured messages to desynchronise the group.

**Assumed knowledge:** All publicly visible event data — kinds, tags, timestamps, encrypted content blobs (but not plaintext).

### A5: Rogue Admin

**Capability:** Legitimate group admin who turns adversarial. Full admin privileges — can add/remove members, reseed, publish state snapshots. Still possesses current seed.

**Goal:** Fabricate state to maintain access after being removed, prevent legitimate reseeds, inject false membership, create desynchronisation.

**Assumed knowledge:** Everything an admin knows — seed, member list, admin list, epoch, consumed ops.

### A6: Removed Insider

**Capability:** Former group member with knowledge of the old seed (before reseed). No longer in the member list. May still have cached group state from before removal.

**Goal:** Derive valid tokens using the old seed, replay old sync messages, attempt to rejoin the group, decrypt old beacon data.

**Assumed knowledge:** The seed that was active during their membership, the member list at that time, any sync messages they previously received.

## Security Properties

These are the properties CANARY claims to provide. The audit will attempt to violate each one.

### P1: Token Unpredictability

**Claim:** An adversary who does not possess the shared secret cannot predict the current verification token with probability significantly better than random guessing (1/2048 for single-word encoding).

**Depends on:** HMAC-SHA256 PRF assumption, seed entropy (256-bit), counter unpredictability to external observers.

**Violated by:** Weak seed generation, predictable counter values observable to outsiders, HMAC implementation flaws.

### P2: Duress Indistinguishability

**Claim:** An adversary who does not possess the shared secret cannot distinguish a duress token from an incorrect guess. The duress token looks like a plausible but wrong answer from the same wordlist.

**Depends on:** Duress token derived independently from verification token (different HMAC input), collision avoidance preventing duress = verification at any counter in the tolerance window.

**Violated by:** Duress token colliding with verification token (collision avoidance failure), observable behavioural differences on duress detection (UX leak), timing differences in verification path.

### P3: Forward Secrecy on Reseed

**Claim:** After a reseed, knowledge of the old seed provides no advantage in deriving tokens from the new seed.

**Depends on:** New seed generated from `crypto.getRandomValues` (not derived from old seed), old seed not usable after reseed.

**Violated by:** Deterministic reseed from old seed (the deprecated `deterministicReseed` function), seed material leaking into the new seed, incomplete state replacement on reseed.

### P4: Replay Resistance

**Claim:** A captured token or sync message cannot be replayed to achieve its effect a second time.

**Depends on:** Counter rotation (time-based or burn-after-use), monotonic counter enforcement, opId replay guards, consumed ops tracking, epoch boundaries.

**Violated by:** Counter rollback, opId collision, consumed ops eviction without floor protection, accepting stale sync messages.

### P5: Coercion Resistance

**Claim:** A coerced member can signal distress to verifiers without the coercer detecting the signal. The signal is indistinguishable from a failed verification to the coercer.

**Depends on:** P2 (duress indistinguishability), silent duress handling in the verifier, no visible indication on the verifier's screen, duress alert transmitted silently.

**Violated by:** UX that reveals duress detection, timing side-channels in verification, duress alert visible to the coercer (e.g. via relay subscription).

### P6: Liveness Guarantee

**Claim:** If a member stops sending liveness heartbeats, the group detects the absence within a bounded time (heartbeat_interval + grace_period).

**Depends on:** Liveness token derivation bound to identity and secret, heartbeat monitoring by group members, DMS trigger on timeout.

**Violated by:** Liveness token forgeable without the secret (but this reduces to P1), monitoring failure (application-level, not protocol-level).

### P7: State Integrity

**Claim:** The sync protocol prevents unauthorised state transitions. Only admins can perform privileged actions. Epoch boundaries are atomic. Counter advancement is monotonic and bounded.

**Depends on:** Authority model (I1-I6 invariants), epoch monotonicity, opId uniqueness, counter bounds, sender verification.

**Violated by:** Authority bypass, epoch manipulation, opId replay, unbounded counter jumps, missing sender checks.

### P8: Timing Safety

**Claim:** The verification function does not leak information about which branch matched (valid vs duress vs invalid) through computation time differences.

**Depends on:** Constant-time string comparison (`timingSafeStringEqual`), all branches computed regardless of match, no early returns based on match status.

**Violated by:** Non-constant-time comparison, short-circuit evaluation, branch-dependent computation.

## Attack Trees

Each adversary profile has an attack tree enumerating goals, sub-goals, and leaf attacks. Each leaf carries a preliminary verdict that will be confirmed or revised during the audit.

### A1: Voice Cloner — Impersonate a Group Member

```
Goal: Derive or guess the current verification token
|
+-- Sub-goal 1: Obtain the shared secret
|   +-- Leaf 1.1: Social-engineer a member into revealing the seed
|   |   -> OUT OF SCOPE (social engineering, not protocol)
|   +-- Leaf 1.2: Compromise a member's device (-> A3)
|   |   -> See A3 attack tree
|   +-- Leaf 1.3: Brute-force the 256-bit seed
|       -> MITIGATED: 2^256 search space; computationally infeasible
|
+-- Sub-goal 2: Predict the token without the secret
|   +-- Leaf 2.1: Guess the word (1/2048 per attempt)
|   |   -> PARTIALLY MITIGATED: Protocol limitation; low probability per attempt
|   |   Risk: Acceptable for real-time verification (one attempt per call)
|   +-- Leaf 2.2: Exploit HMAC-SHA256 weakness
|   |   -> MITIGATED: No known practical attacks on HMAC-SHA256
|   +-- Leaf 2.3: Exploit encoding bias
|       -> AUDIT: Verify modulo reduction bias is negligible
|
+-- Sub-goal 3: Replay a previously heard token
    +-- Leaf 3.1: Replay within the same time window
    |   -> PARTIALLY MITIGATED: Burn-after-use advances counter;
    |   but if burn hasn't propagated, replay possible within window
    +-- Leaf 3.2: Replay across time windows
        -> MITIGATED: Counter rotation invalidates old tokens
```

### A2: Coerced Member — Signal Distress Silently

```
Goal: Trigger duress alert without attacker detection
|
+-- Sub-goal 1: Speak duress token instead of verification token
|   +-- Leaf 1.1: Duress word is distinguishable from wrong guess
|   |   -> AUDIT: Verify P2 (indistinguishability)
|   +-- Leaf 1.2: Verifier's screen reveals duress detection
|   |   -> SPEC REQUIREMENT: MUST NOT display duress token in default view
|   +-- Leaf 1.3: Timing of verification reveals duress path
|       -> AUDIT: Verify P8 (timing safety)
|
+-- Sub-goal 2: Attacker forces screen inspection
|   +-- Leaf 2.1: Duress token visible in default UI
|   |   -> SPEC REQUIREMENT: MUST NOT display duress token in default view
|   +-- Leaf 2.2: Duress label visible in UI
|       -> SPEC REQUIREMENT: SHOULD NOT label any element "duress" or "coercion"
|
+-- Sub-goal 3: Attacker monitors relay for duress events
    +-- Leaf 3.1: Kind 28802 duress=true visible in plaintext
    |   -> MITIGATED: Content is NIP-44 encrypted; duress flag in encrypted payload
    +-- Leaf 3.2: Kind 20800 duress alert distinguishable from normal beacon
        -> AUDIT: Verify beacon and duress alert are structurally identical events
```

### A3: Compromised Device — Extract Seed and Escalate

```
Goal: Full group compromise from one device
|
+-- Sub-goal 1: Extract the group seed
|   +-- Leaf 1.1: Read seed from device storage
|   |   -> PARTIALLY MITIGATED: Spec requires encrypted storage + device auth;
|   |   enforcement is application-level, not protocol-level
|   +-- Leaf 1.2: Read seed from memory during derivation
|       -> PARTIALLY MITIGATED: HMAC pads are zeroed after use (crypto.ts:171-173);
|       seed itself remains in memory during group operations
|
+-- Sub-goal 2: Derive valid tokens
|   +-- Leaf 2.1: Derive verification tokens for all future counters
|   |   -> UNMITIGATED until reseed: symmetric key = full derivation capability
|   +-- Leaf 2.2: Derive duress tokens for all members
|       -> UNMITIGATED until reseed: same seed derives all duress tokens
|
+-- Sub-goal 3: Persist across reseed
|   +-- Leaf 3.1: Intercept new seed during distribution (kind 28800)
|   |   -> MITIGATED: Seed distribution uses NIP-44 encryption to specific recipient
|   +-- Leaf 3.2: Fabricate state-snapshot with higher epoch
|       -> PARTIALLY MITIGATED: Known limitation documented in sync.ts;
|       sender must be in snapshot's own admin list (self-consistency check)
|
+-- Sub-goal 4: Desynchronise the group
    +-- Leaf 4.1: Send counter-advance with large jump
    |   -> MITIGATED: MAX_COUNTER_ADVANCE_OFFSET = 100 bounds the jump
    +-- Leaf 4.2: Replay old sync messages
        -> MITIGATED: opId replay guard + consumed ops + epoch boundaries
```

### A4: Network Observer — Correlate and Replay

```
Goal: Learn group membership or replay messages
|
+-- Sub-goal 1: Identify group members
|   +-- Leaf 1.1: Read p-tags on kind 38800 (group metadata)
|   |   -> PARTIALLY MITIGATED: p-tags are cleartext (Nostr limitation);
|   |   relay can see member pubkeys
|   +-- Leaf 1.2: Correlate kind 20800 beacon timing with member activity
|       -> PARTIALLY MITIGATED: h-tag is hashed group ID (hashGroupTag);
|       but timing correlation possible
|
+-- Sub-goal 2: Decrypt event content
|   +-- Leaf 2.1: Decrypt NIP-44 encrypted content without private key
|   |   -> MITIGATED: NIP-44 encryption security
|   +-- Leaf 2.2: Decrypt AES-256-GCM beacon without beacon key
|       -> MITIGATED: AES-256-GCM IND-CCA2 security
|
+-- Sub-goal 3: Replay captured events
|   +-- Leaf 3.1: Replay kind 28802 (word used) to advance counter
|   |   -> MITIGATED: Event must be signed by group member; signature not forgeable
|   +-- Leaf 3.2: Replay kind 20800 (beacon) to inject stale location
|       -> MITIGATED: FIRE_AND_FORGET_FRESHNESS_SEC = 300s freshness window
|
+-- Sub-goal 4: Derive tokens from observed events
    +-- Leaf 4.1: Use observed word to predict next word
        -> MITIGATED: HMAC-SHA256 output at counter N reveals nothing about counter N+1
```

### A5: Rogue Admin — Maintain Access After Removal

```
Goal: Retain group access or disrupt group operations
|
+-- Sub-goal 1: Prevent removal
|   +-- Leaf 1.1: Fabricate state-snapshot restoring self as member
|   |   -> PARTIALLY MITIGATED: Known limitation (state-snapshot epoch hijack);
|   |   self-consistency check requires sender in snapshot's admin list
|   +-- Leaf 1.2: Race condition — publish snapshot before removal propagates
|       -> AUDIT: Verify epoch ordering prevents this
|
+-- Sub-goal 2: Fabricate false state
|   +-- Leaf 2.1: Create higher-epoch snapshot with rogue membership
|   |   -> PARTIALLY MITIGATED: Same known limitation as above;
|   |   prevEpochSeed continuity proof helps but is optional
|   +-- Leaf 2.2: Inject member-join for controlled pubkey
|       -> MITIGATED: member-join requires epoch match (I3) + opId uniqueness (I2)
|
+-- Sub-goal 3: Desynchronise group
|   +-- Leaf 3.1: Publish conflicting reseeds
|   |   -> MITIGATED: Reseed requires epoch == local + 1 (I4); only one can match
|   +-- Leaf 3.2: Flood with counter-advance messages
|       -> MITIGATED: MAX_COUNTER_ADVANCE_OFFSET bounds damage
|
+-- Sub-goal 4: Derive tokens with old seed post-removal
    +-- Leaf 4.1: Use old seed before reseed propagates
        -> PARTIALLY MITIGATED: Window of vulnerability between removal and reseed;
        removeMemberAndReseed() recommended but not enforced by protocol
```

### A6: Removed Insider — Use Old Seed

```
Goal: Derive valid tokens or rejoin group
|
+-- Sub-goal 1: Derive tokens with old seed
|   +-- Leaf 1.1: Derive verification word from old seed
|   |   -> MITIGATED after reseed: New seed is cryptographically random (P3)
|   +-- Leaf 1.2: Derive tokens before reseed completes
|       -> PARTIALLY MITIGATED: Time window between removal and seed distribution;
|       depends on application promptness
|
+-- Sub-goal 2: Decrypt old beacon data
|   +-- Leaf 2.1: Use old beacon key to decrypt past beacons
|       -> UNMITIGATED: By design — old beacons encrypted with old key remain
|       decryptable. Not a forward secrecy violation (beacons are ephemeral
|       and expire via NIP-40)
|
+-- Sub-goal 3: Rejoin the group
|   +-- Leaf 3.1: Replay old member-join message
|   |   -> MITIGATED: opId replay guard + epoch must match
|   +-- Leaf 3.2: Self-add via fabricated member-join
|       -> MITIGATED: member-join is privileged (requires admin sender, I1)
|
+-- Sub-goal 4: Replay old sync messages
    +-- Leaf 4.1: Replay pre-removal sync messages
        -> MITIGATED: Epoch boundary clears consumedOps, but old-epoch messages
        rejected by I6 (stale epoch check)
```

## Trust Boundaries

```
+----------------------------------------------------------+
|                    TRUSTED ZONE                          |
|                                                          |
|  +--------------+    +--------------+                   |
|  | Device A      |    | Device B      |                  |
|  |  +----------+|    | +----------+ |                   |
|  |  | Keychain ||    | | Keychain | |                   |
|  |  | (seed)   ||    | | (seed)   | |                   |
|  |  +----------+|    | +----------+ |                   |
|  |  +----------+|    | +----------+ |                   |
|  |  | canary-  ||    | | canary-  | |                   |
|  |  | kit      ||    | | kit      | |                   |
|  |  +----------+|    | +----------+ |                   |
|  +------+-------+    +------+-------+                   |
|         |                    |                            |
|         |  Verification      |                            |
|         |  Channel           |                            |
|         |  (voice/in-person) |                            |
|         +--------+-----------+                            |
|                  |                                        |
+------------------+----------------------------------------+
   BOUNDARY 1:     |  Device <-> Transport
                   |
          +--------+--------+
          | NIP-44 / AES-GCM|  <-- Encryption at boundary
          +--------+--------+
                   |
+------------------+----------------------------------------+
|    UNTRUSTED     |  ZONE                                 |
|                  |                                        |
|         +--------+--------+                               |
|         |  Nostr Relay     |  <-- Sees metadata, not      |
|         |  (transport)     |      plaintext content        |
|         +-----------------+                               |
|                                                          |
|    Relay sees: event kinds, p-tags (pubkeys),            |
|    timestamps, encrypted content blobs                    |
|    Relay does NOT see: seeds, tokens, duress flags,      |
|    beacon locations, reason text                          |
+----------------------------------------------------------+
```

### Boundary Analysis

| Boundary | What crosses it | Protection | Residual risk |
|----------|----------------|------------|---------------|
| Device <-> Transport | Sync messages, seed distribution, beacons | NIP-44 encryption, AES-256-GCM | Metadata visible (p-tags, timing) |
| Device <-> Verification Channel | Spoken tokens | Shared secret knowledge | Eavesdropping captures one token (useless after rotation) |
| Device <-> Storage | Group seed, cached state | Platform keychain, device auth | Device compromise (A3) |
| Admin <-> Group State | Privileged operations | Authority model (I1-I6) | Rogue admin (A5), known snapshot limitation |

## Cryptographic Assumptions

| Primitive | Assumption | Standard | Failure impact |
|-----------|-----------|----------|----------------|
| HMAC-SHA256 | Collision-resistant PRF | RFC 2104 + FIPS 180-4 | P1 (token unpredictability) broken |
| SHA-256 | Pre-image resistant, collision resistant | FIPS 180-4 | Hash-based operations compromised |
| AES-256-GCM | IND-CCA2 secure authenticated encryption | NIST SP 800-38D | Beacon/sync encryption broken |
| crypto.getRandomValues | Cryptographically secure PRNG | Web Crypto API | Seed predictability (P1 broken) |
| NIP-44 | Secure encryption to a known public key | Nostr NIP-44 | Seed distribution interceptable |

## Known Limitations (By Design)

| Limitation | Rationale | Mitigation |
|-----------|-----------|------------|
| Symmetric shared secret | Enables offline derivation without server dependency | Prompt reseed on compromise; `removeMemberAndReseed()` |
| p-tags visible on relay | Nostr protocol design; encrypted membership requires relay cooperation | Accept metadata exposure; use relay access controls if needed |
| State-snapshot epoch hijack | Quorum or verifiable chain needed; deferred to protocol v2 | Self-consistency check; `prevEpochSeed` continuity proof |
| 1-word encoding collision probability | 2048 outputs = birthday collisions at ~20 members | Use 2+ words for groups >10 members (documented in spec) |
| Old beacons decryptable with old key | Beacons are ephemeral by design (NIP-40 expiration) | Reseed generates new beacon key; old beacons expire naturally |
