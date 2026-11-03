# Education — full-range IL

## Formula

For price ratio `r = num/den`:

```text
IL_bps ≈ (2 * sqrt(r) / (1 + r) - 1) * 10000
```

Implemented with integer square root (`isqrt`) so results are deterministic and testable.

## Teaching points

1. **Not concentrated liquidity.** Width is a symmetric teaching band around entry, not tick math.
2. **Not Alcor.** No pool is read.
3. **Symmetric.** `r` and `1/r` share the same IL bps under this formula.
4. **IL ≠ realized PnL.** Fees, exits, and inventory are out of scope.

## Classic anchors

| ratio | fullRangeIlBps |
|-------|----------------|
| 1/1 | 0 |
| 2/1 or 1/2 | negative (small) |
| 4/1 or 1/4 | -2000 |

## Related

- `wax-lp-fee-lifecycle-auditor`
- `wax-alcor-pool-migration-tracker`
- `wax-lp-behavioral-profiler`
