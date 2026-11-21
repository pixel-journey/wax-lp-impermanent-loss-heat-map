# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX / DeFi product context |
| [SECURITY.md](SECURITY.md) | Non-claims |
| [alcor range backtester](https://github.com/pixel-journey/wax-alcor-v2-range-efficiency-backtester) | Fee product teaching (different formula) |
| [DeFi health](https://github.com/pixel-journey/wax-defi-protocol-health-dashboard) | Tags on TVL/volume (different product) |

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
- **Not** concentrated-liquidity IL. **No** Alcor pool is read.
- Teaching arithmetic only — not withdrawal authorization.
