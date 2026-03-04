# CANARY Sync Protocol

Version: 1

## Authority Model (I1–I6)

See the implementation plan for the full invariant set. This document specifies
operational semantics that complement the invariants.

## Conflict Resolution (H3)

### Reseed conflicts

First-valid-wins. The first reseed message arriving with `msg.epoch == local.epoch + 1`
is accepted; subsequent reseeds targeting the same epoch are rejected (I4: epoch mismatch).

No tie-breaking is needed: epoch monotonicity guarantees at most one valid reseed per
epoch transition.

### Same-epoch privileged ops

Apply in arrival order. No buffering or reordering.

**Known limitation:** Two admins issuing valid privileged ops in the same epoch
concurrently may produce different state on different receivers depending on
network delivery order. The next epoch bump (reseed) reconciles state.

**Recommendation:** Groups with multiple admins should coordinate privileged
operations. For critical operations (member removal, reseed), a single admin
should be designated as the coordinator.

### Non-privileged ops

Apply in arrival order. counter-advance has its own monotonicity guard (effective
counter must increase). Beacons, duress alerts, and liveness check-ins are
fire-and-forget and do not modify group state.

## Replay Log Persistence (H4)

### Requirements

- `consumedOps` MUST be persisted atomically with group state (same write transaction).
- `consumedOps` is cleared on epoch bump (I4). Within an epoch, no GC.
- On startup, load `consumedOps` from persisted state.
- If state is lost, the group MUST be re-initialised from an invite (which carries
  epoch, triggering I5 forward-only migration).

### Garbage collection

The `consumedOps` set is bounded by admin action frequency within a single epoch.
For typical CANARY groups (2–10 members, few admin actions per day), this set
remains small (< 100 entries).

## Clock Skew Policy (H5)

### Constants

- `MAX_CLOCK_SKEW_SEC = 300` (5 minutes)

### Application

| Context | Guard | Behaviour |
|---------|-------|-----------|
| Invite `issuedAt` | `issuedAt > now + MAX_CLOCK_SKEW_SEC` → reject | Hard fail |
| Liveness check-ins | `timestamp > now + MAX_FUTURE_SKEW_SEC` → reject | Hard fail (already enforced) |
| Privileged op timestamps | Informational only | Epoch/opId provide replay protection |
| Invite expiry | `expiresAt <= now` → reject | Hard fail (already enforced) |

### Notes

- Messages with timestamps in the past are accepted (staleness is handled by epoch/opId).
- NTP synchronisation is RECOMMENDED but not required.

## Canonical Serialisation (H2)

Inner signatures are computed over `canonicaliseSyncMessage(msg)`, which produces
recursively sorted-key JSON with no whitespace. The message's `protocolVersion` field
is preserved as-is (not overwritten). The send side is responsible for setting
`protocolVersion` before both encode and canonicalise.

Both sender and receiver derive canonical bytes from the decoded `SyncMessage` object,
not from raw wire JSON. This ensures hash agreement regardless of JSON serialisation order.

## Protocol Versioning (H1)

- `protocolVersion` is required on all wire messages and invites.
- Receivers reject messages where `protocolVersion !== PROTOCOL_VERSION` (exact match).
- Receivers reject messages without `protocolVersion` (hard cutover).
- Version `1` is the first and current version.
- Bump on any breaking wire format change.
