# wax-lp-impermanent-loss-heat-map

> **Trust label:** `educational-reference`  
> **Status:** Full-thrust + polish (2026-11-03)  
> **Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**One-sentence goal:** Teach **full-range impermanent loss** at a price ratio (integer math) plus a symmetric teaching band — without claiming concentrated liquidity or live Alcor data.

## What is actually in the repo

| Piece | Role |
|-------|------|
| `src/il.ts` | `isqrt`, `fullRangeIlBps`, band, heat grid, compare, fee sketch, bar |
| `src/*.test.ts` | Anchors, symmetry, band, shareState |
| `src/Demo.tsx` | Interactive lab + exports |
| `EDUCATION.md` / `ARCHITECTURE.md` / `POLICY.md` / `SECURITY.md` | Teaching + boundaries |

## Quick start

```bash
npm install
npm test
npm run dev
```

```ts
import { fullRangeIlBps } from "./src/il";

fullRangeIlBps(4n, 1n); // -2000n
```

## Related

- `wax-lp-fee-lifecycle-auditor` · `wax-alcor-pool-migration-tracker` · `wax-lp-behavioral-profiler`

## License

MIT — Pixel Journey
