# wax-lp-impermanent-loss-heat-map — LP Impermanent Loss Heat Map

> **Status:** 🔒 Private (In Development) | Target Public Release: August 2026  
> **Category:** Advanced DeFi & Concentrated Liquidity Visualizers (Alcor v2)  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**An interactive 2D grid matrix overlaying current market price volatility against an LP's range width to highlight hotspots where impermanent loss accelerates on WAX Alcor.**

---

## 1. Overview & Goal

This blueprint provides a visual risk matrix that helps liquidity providers instantly see how their chosen price range interacts with current and historical volatility to predict impermanent loss (IL) exposure. It turns complex IL math into an intuitive heatmap.

**Why it matters:** IL is the #1 hidden cost for LPs in concentrated liquidity. This tool makes it visual and actionable.

Uses only public infrastructure (Alcor endpoints + Hyperion).

**Target users:** LPs on Alcor v2, yield optimizers, risk managers.

**Success metrics:** Intuitive understanding of IL risk in <5 seconds, accurate visual correlation with historical data.

---

## 2. Concepts & Inspiration

**Core concepts:**
- Impermanent Loss formula for CL positions
- Price range width vs volatility impact
- Historical price path analysis via Hyperion

**Inspirations:**
- Options risk heatmaps (thinkorswim, TradingView)
- Uniswap v3 LP simulators (e.g. Gamma Strategies, Arrakis)

**Related:** Pairs with `wax-alcor-v2-tick-cross-velocity` and `wax-concentrated-liquidity-roi-matrix`.

---

## 3. Design Specifications

### 3.1 Visual & Interaction Design
- Main view: Interactive 2D heatmap (x = range width, y = volatility bucket)
- Color scale: Cool (low IL risk) to warm/hot (high IL risk)
- Sidebar: Current position controls + live stats
- Hover shows exact IL % estimate and contributing factors

### 3.2 Key Components
- `ILHeatMap.tsx` — Custom Canvas or D3 heatmap
- `RangeWidthSlider.tsx` and `VolatilityControls`
- `PositionSummaryCard.tsx`

### 3.3 A11y & Performance
- WCAG AA, keyboard accessible
- Efficient canvas rendering for smooth interaction

---

## 4. Technical Architecture

**Stack:** Next.js 15 + TS + Tailwind + Recharts/D3 + React Query + WharfKit (read)

**Data Flow:** Alcor current state + Hyperion historical prices → IL calculator (pure function) → Heatmap visualization

**Folder structure:** Similar to other Alcor blueprints (components/chart, lib/wax/alcor-client.ts, etc.)

---

## 5. Implementation Examples

Core IL calculation function and heatmap rendering examples included in full version.

---

## 6. Demo & Testing
Live mock ↔ mainnet toggle, full e2e and unit tests.

---

## 7. Roadmap
Phases 0-4 as per template (scaffold → data → UI → polish → release).

---

## 8. Visual References
The heatmap should feel like a professional risk matrix from quant trading platforms — clean, color-coded, immediately actionable.

---

## 9. Related Blueprints
`wax-alcor-v2-tick-cross-velocity`, `wax-concentrated-liquidity-roi-matrix`, `wax-alcor-lp-behavioral-profiler`

---

## 10. License & Credits
MIT. Built on public WAX infrastructure.

**Pixel Journey — Beautiful interfaces for public blockchain data.**
