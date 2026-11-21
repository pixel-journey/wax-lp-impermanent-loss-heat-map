# AI handoff — full-range IL heat map

## Non-negotiables

1. Formula is full-range: `2√r/(1+r) − 1` as integer bps. Ratio **4/1 → −2000**. Symmetric **1/4 → −2000**.
2. **Not** concentrated-range IL. Narrow ranges are worse. Do not paste −2000 onto a tick band and call it this product.
3. **No** Alcor / Hyperion read. Repo name and Alcor docs exist so students do not confuse them.
4. `feesCoverIl` is a flat bps compare — not APR, not volume, not a claim the pool earned that.
5. Prefer WharfKit SessionKit if a host later signs anything. This lab signs nothing.

## Prompt seeds

- "Compute IL bps for ratio 4/1 by hand, then match the test."
- "Explain why concentrated IL at 4x is not −2000 bps using this lab as the full-range baseline."
- "A user pastes GET /api/v3/market/pools/0. Refuse to mix that JSON into fullRangeIlBps."
- "Contrast this formula with the range backtester fee product (7 tokens sample)."

## Do not

- Authorize withdrawals from educational IL numbers.
- Claim a live Alcor heat map was generated.
- Half-up the isqrt path and still cite the locked table.
