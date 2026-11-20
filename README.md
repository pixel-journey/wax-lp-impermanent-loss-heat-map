# Full-range IL for a price ratio — not a live heat map

> **Trust:** `educational-reference`  
> **Catalog:** `wax-ecosystem-blueprint-catalog` (private index; not this public course)

**One-sentence goal:** Teach full-range impermanent loss in basis points, a symmetric band check, and a flat fee-cover compare — without reading an Alcor pool or modeling concentrated liquidity.

**Real code:** `npm test`. **Does not** query Alcor or claim a live heat map.

The course is [EDUCATION.md](EDUCATION.md).

## What is true (executed)

| Rule | Result |
| --- | --- |
| `fullRangeIlBps(1n, 1n)` | `0n` |
| `fullRangeIlBps(4n, 1n)` | `-2000n` |
| `ilMagnitudeBps(4n, 1n)` | `2000n` |
| 4/1 vs 1/4 | same bps |
| 2/1 inside width 2/1 | true |
| 4/1 inside width 2/1 | false |
| `heatRow(4n, 1n, 2n, 1n).ilBps` | `-2000n` |
| `feesCoverIl(4n, 1n, 2000n)` | covered |
| `feesCoverIl(4n, 1n, 1000n)` | gap `1000n` |
| zero ratio | throws |

## What is in the repo

| Piece | Role |
| --- | --- |
| `src/il.ts` | IL, band, heat row, fee cover |
| `src/il.test.ts` | the executed rule |
| `src/Demo.tsx` | interactive grid |
| Docs | EDUCATION · POLICY · SECURITY · VERIFICATION-LOG |

## Run

```bash
npm install
npm test
npm run dev
```

## Best practice and the opposite

**Do** label the number as full-range IL.  
**Do** keep ratios as bigints.  
**Do** treat the fee compare as a flat integer check.

**Do not** call this concentrated-liquidity IL.  
**Do not** claim an Alcor position was read.  
**Do not** say 2000 fee bps means the pool earned 20%.

## Related

- [wax-lp-fee-lifecycle-auditor](https://github.com/pixel-journey/wax-lp-fee-lifecycle-auditor)
- [wax-alcor-pool-migration-tracker](https://github.com/pixel-journey/wax-alcor-pool-migration-tracker)
- The formula is constant-product full-range IL: `2 * sqrt(r) / (1 + r) - 1`, in integer bps. It is not an Alcor v2 range. Alcor's own code: [alcor-exchange](https://github.com/alcor-exchange). `wax-market-cap-bubble` is still private.

MIT — Pixel Journey
