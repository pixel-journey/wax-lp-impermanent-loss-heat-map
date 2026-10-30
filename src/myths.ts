export const IL_MYTHS = [
  {
    myth: "This is concentrated-liquidity IL for Alcor ranges",
    reality:
      "fullRangeIlBps is the classic constant-product full-range formula only.",
  },
  {
    myth: "This page reads live Alcor depth",
    reality:
      "Demo is offline. Unsent request shapes exist; executed is false.",
  },
  {
    myth: "Inside the 2x band means zero IL",
    reality:
      "Inside only means the ratio sits in [1/width, width]. Full-range IL can still be non-zero.",
  },
] as const;
