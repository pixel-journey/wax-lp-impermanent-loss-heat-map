# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX / DeFi product context |
| [SECURITY.md](SECURITY.md) | Non-claims |
| [alcor range backtester](https://github.com/pixel-journey/wax-alcor-v2-range-efficiency-backtester) | Fee product teaching (different formula) |

## Product facts locked by tests

```text
fullRangeIlBps = 2 * isqrt(num * den) * 10000 / (num + den) - 10000
```

- `1/1` → **0** bps; `4/1` → **−2000** bps (same for `1/4`).
- Symmetric band `2/1` includes `2/1` and excludes `4/1`.
- `feesCoverIl` is a **flat** bps compare, not APR or volume.
- **Not** concentrated-liquidity IL. **No** Alcor pool is read.
