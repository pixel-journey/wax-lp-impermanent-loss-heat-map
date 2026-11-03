# Education — full-range IL

## Formula

```text
IL_bps ≈ (2 * sqrt(r) / (1 + r) - 1) * 10000
```

Implemented with integer square root (`isqrt`).

## Teaching points

1. Not concentrated liquidity — width is a symmetric teaching band.
2. Not Alcor — no pool is read.
3. Symmetric under ratio inversion.
4. IL ≠ realized PnL; `feesCoverIl` is a flat sketch only.

## Classic anchors

| ratio | fullRangeIlBps |
|-------|----------------|
| 1/1 | 0 |
| 4/1 or 1/4 | -2000 |

## Related

- `wax-lp-fee-lifecycle-auditor`
- `wax-alcor-pool-migration-tracker`
- `wax-lp-behavioral-profiler`
