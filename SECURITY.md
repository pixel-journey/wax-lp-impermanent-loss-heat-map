# Security — full-range impermanent loss (teaching arithmetic)

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Ratio 1/1 | **0** bps |
| Ratio 4/1 (and 1/4) | **−2000** bps (symmetric) |
| Non-positive ratios | throw |
| 4x outside a 2x band | `insideSymmetric` false |
| `feesCoverIl(4x, 1000)` | not covered, gap 1000 |
| `feesCoverIl(4x, 2000)` | covered |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Pool state | Never reads Alcor / Hyperion |
| Concentrated liquidity | Full-range formula only — not tick ranges |
| Fee APR | Flat bps compare, not volume over time |
| Equity claim | Educational IL ≠ withdrawal amount |

## Attack angles

1. Pasting −2000 bps onto a **narrow range** position (concentrated IL is worse).  
2. Treating `feesCoverIl` as proof the pool earned that APR.  
3. Claiming a live Alcor heat map was generated when only pure math ran.  
4. Using classic "50% at 4x" folklore instead of the `2√r/(1+r)−1` form.  
5. Authorizing withdrawals from educational IL numbers.

## Honesty limits

No network. No wasm. No position NFT.

| Sibling | Distinction |
| --- | --- |
| [Alcor range backtester](https://github.com/pixel-journey/wax-alcor-v2-range-efficiency-backtester) | Fee product floor, not IL |
| [DeFi health](https://github.com/pixel-journey/wax-defi-protocol-health-dashboard) | Tags on TVL/volume/LPs |

[docs.wax.io](https://docs.wax.io/). Prefer WharfKit if a host later adds intentional chain actions.
