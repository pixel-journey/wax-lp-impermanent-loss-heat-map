# Policy — IL heat lab

**Trust label:** `educational-reference`  
**Updated:** 2026-11-03

## In scope

- Pure full-range IL bps + symmetric band helpers
- Educational fee-cover sketch (flat bps, not APR)
- Offline demo, share URL, exports

## Out of scope

- Concentrated liquidity / tick math
- Live Alcor or any AMM product
- Fee-inclusive realized PnL as a product claim

## Rules

1. `npm test` never requires network.
2. Docs must not claim live pool TVL or CL ranges.
3. Prefer WharfKit if a future host adds intentional chain actions.
