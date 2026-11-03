export const IL_MYTHS = [
  {
    myth: "This is concentrated-liquidity or Alcor pool IL",
    reality:
      "Full-range formula only. Width is a teaching band, not a Uniswap-v3 tick range.",
  },
  {
    myth: "IL is always a realized loss",
    reality:
      "Classic IL compares LP value to holding; fees and exits are out of scope here.",
  },
  {
    myth: "4x and 1/4x differ in magnitude",
    reality: "fullRangeIlBps is symmetric under ratio inversion.",
  },
  {
    myth: "A heat map cell is live market data",
    reality: "Ratios are arguments. No pool is read.",
  },
  {
    myth: "Fee-income bps here is live APR",
    reality:
      "feesCoverIl is a flat educational sketch against |IL|, not an APR model.",
  },
] as const;

export const GLOSSARY = [
  {
    term: "fullRangeIlBps",
    meaning: "(2√r/(1+r) − 1) in bps for r = num/den, integer sqrt.",
  },
  {
    term: "insideSymmetric",
    meaning: "Whether r sits in [1/width, width] around entry.",
  },
  {
    term: "feesCoverIl",
    meaning: "Whether a flat fee-income bps number covers |IL| (sketch).",
  },
  {
    term: "compareIl",
    meaning: "Delta of IL bps between two ratios.",
  },
] as const;
