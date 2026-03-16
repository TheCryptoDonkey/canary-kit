# AGENTS.md — canary-kit

Instructions for AI coding agents working on this repository.

## What This Project Is

Deepfake-proof identity verification library. Derives spoken words from shared secrets using HMAC-SHA256 counters. Supports bidirectional verification, duress signalling, encrypted location beacons, and Nostr event building. Minimal dependencies (`@scure/bip32`, `@scure/bip39` for mnemonic key recovery; core crypto is pure JS). ESM-only. TypeScript native.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Compile TypeScript to dist/ |
| `npm test` | Run all tests (vitest) |
| `npm run test:watch` | Watch mode |
| `npm run typecheck` | Type-check without emitting |
| `npm run bench` | Run performance benchmarks |
| `npm run demo` | Build and serve interactive demo at localhost:8787 |
| `npm run test:e2e` | Run all Playwright e2e tests |

## Project Structure

```
src/
  index.ts       — barrel re-export (main entry)
  token.ts       — universal CANARY protocol (derive, verify, liveness, directional pairs)
  encoding.ts    — output encoding (words, PIN, hex)
  session.ts     — directional two-party verification sessions
  derive.ts      — group word/phrase derivation
  verify.ts      — group word verification
  group.ts       — group lifecycle (create, reseed, add/remove members)
  presets.ts     — threat-profile presets (family, field-ops, enterprise)
  beacon.ts      — encrypted location beacons and duress alerts
  nostr.ts       — Nostr event builders (6 event kinds)
  sync.ts        — transport-agnostic group state synchronisation
  wordlist.ts    — 2048-word en-v1 spoken-clarity wordlist
  counter.ts     — time-based counter derivation
  crypto.ts      — pure JS SHA-256, HMAC-SHA256, hex/base64 utilities
app/             — interactive demo app (Vite, builds to docs/)
```

Eight subpath exports: `canary-kit`, `canary-kit/token`, `canary-kit/encoding`, `canary-kit/session`, `canary-kit/wordlist`, `canary-kit/nostr`, `canary-kit/beacon`, `canary-kit/sync`.

## Conventions

- **British English** — colour, initialise, behaviour, licence
- **Minimal dependencies** — `@scure/bip32` and `@scure/bip39` for mnemonic key recovery; core crypto is pure JS
- **ESM-only** — `"type": "module"` in package.json
- **TDD** — write a failing test first, then implement
- **Pure functions** — group management returns new state, never mutates input
- **Input validation** — all public APIs validate inputs and throw on invalid parameters

## Commit Messages

Uses [semantic-release](https://semantic-release.gitbook.io/) — message prefixes determine version bumps:

| Prefix | Version bump |
|--------|-------------|
| `feat:` | Minor (1.x.0) |
| `fix:` | Patch (1.0.x) |
| `docs:`, `chore:`, `refactor:` | None |

Do NOT include `Co-Authored-By` lines in commits.

## Testing

Tests live alongside source files as `*.test.ts`. Run `npm test` before committing. Run `npm run typecheck` to verify types.

## Key Patterns

- All group functions are pure — they return new `GroupState`, never mutate input
- Crypto primitives in `src/crypto.ts` are synchronous pure JS (SHA-256, HMAC-SHA256)
- Only `src/beacon.ts` uses async crypto (`crypto.subtle` for AES-256-GCM)
- Nostr event builders return `UnsignedEvent` — signing is the caller's responsibility
- Sync protocol validates against 6 invariants (admin checks, epoch ordering, replay protection)

## Protocol Specs

- `CANARY.md` — full protocol specification
- `NIP-CANARY.md` — Nostr binding (6 event kinds)
- `INTEGRATION.md` — enterprise/finance integration guide
- `THREAT-MODEL.md` — adversary profiles and attack trees
- `AUDIT.md` — adversarial security audit findings
