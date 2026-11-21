# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX / DeFi product context |
| [docs.alcor.exchange/api](https://docs.alcor.exchange/api) | v2 market data still hosted; v3 market / analytics / feed for new pool clients. **This lab does not call either.** |
| [SECURITY.md](SECURITY.md) | Non-claims |
| [alcor range backtester](https://github.com/pixel-journey/wax-alcor-v2-range-efficiency-backtester) | Fee product teaching (different formula) |
| [concentrated ROI](https://github.com/pixel-journey/wax-concentrated-liquidity-roi-matrix) | Fee minus this IL |

## Product facts locked by tests

```text
fullRangeIlBps = 2 * isqrt(num * den) * 10000 / (num + den) - 10000
```

| Ratio | IL bps |
| --- | --- |
| 1/1 | **0** |
| 4/1 | **−2000** |
| 1/4 | **−2000** (symmetric) |

- Symmetric band `2/1` includes `2/1` and excludes `4/1`.
- `feesCoverIl` is a **flat** bps compare, not APR or volume.
- **Not** concentrated-liquidity IL. Narrow ranges lose **more** than full-range −2000 at 4x.
- **No** Alcor pool is read. Arguments only.

## Portability

The ratio formula is pure integer math. It is not a WAX opcode. Token precision only matters if a host later turns the bps into asset amounts.

## What this is not

- Not a live Alcor heat map.
- Not withdrawal authorization.
- Not proof the pool earned an APR equal to `feesCoverIl`.
