# Security notes

**Trust label:** `educational-reference`

## What this package does not do

- No private keys, wallets, or signing
- No Alcor / Hyperion calls on the measure path
- No concentrated-liquidity tick simulation
- No claim that educational IL bps equals account equity

## Host-product guidance

- Treat `fullRangeIlBps` and `feesCoverIl` as **teaching arithmetic**, not withdrawal or APR authorization.
- Share URLs only encode ratio/width demo numbers — not session tokens.
- localStorage holds last ratio/width on the same origin; clear on shared devices.
- Prefer **WharfKit** if a future host adds intentional chain actions.

## Supply-chain

Correctness is locked by pure unit tests (anchors, symmetry, band, fee sketch). Pin dependencies for any public deploy.
