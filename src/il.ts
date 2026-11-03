/**
 * Full-range impermanent loss for a price ratio, plus whether that ratio
 * sits inside a symmetric band. Not concentrated-liquidity IL. Not Alcor.
 */

export function isqrt(n: bigint): bigint {
  if (n < 0n) throw new Error("square root of a negative");
  if (n < 2n) return n;
  let x = n;
  let y = (x + 1n) / 2n;
  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }
  return x;
}

/**
 * (2*sqrt(r)/(1+r) - 1) in bps. r = num/den.
 * Truncates toward zero on the integer square root.
 * Result is ≤ 0 for valid ratios (0 at r=1).
 */
export function fullRangeIlBps(num: bigint, den: bigint): bigint {
  if (num <= 0n || den <= 0n) throw new Error("ratio must be positive");
  return (2n * isqrt(num * den) * 10_000n) / (num + den) - 10_000n;
}

/** Absolute magnitude of IL as a positive bigint (for meters). */
export function ilMagnitudeBps(num: bigint, den: bigint): bigint {
  const v = fullRangeIlBps(num, den);
  return v < 0n ? -v : v;
}

/**
 * Range is [1/width, width] around the entry price.
 * width = widthNum/widthDen and must be ≥ 1.
 */
export function insideSymmetric(
  ratioNum: bigint,
  ratioDen: bigint,
  widthNum: bigint,
  widthDen: bigint
): boolean {
  if (ratioNum <= 0n || ratioDen <= 0n || widthNum <= 0n || widthDen <= 0n) {
    throw new Error("values must be positive");
  }
  if (widthNum < widthDen) throw new Error("width must be at least 1");
  const belowOrAtTop = ratioNum * widthDen <= widthNum * ratioDen;
  const aboveOrAtBottom = ratioNum * widthNum >= ratioDen * widthDen;
  return belowOrAtTop && aboveOrAtBottom;
}

export type Cell = { ratio: string; ilBps: bigint; inside: boolean };

export function heatRow(
  ratioNum: bigint,
  ratioDen: bigint,
  widthNum: bigint,
  widthDen: bigint
): Cell {
  return {
    ratio: `${ratioNum}/${ratioDen}`,
    ilBps: fullRangeIlBps(ratioNum, ratioDen),
    inside: insideSymmetric(ratioNum, ratioDen, widthNum, widthDen),
  };
}

export function heatGrid(
  ratios: readonly [bigint, bigint][],
  widthNum: bigint,
  widthDen: bigint
): Cell[] {
  return ratios.map(([n, d]) => heatRow(n, d, widthNum, widthDen));
}

/** Symmetric inverse ratio (a/b → b/a) should share the same IL magnitude. */
export function ilSymmetric(num: bigint, den: bigint): boolean {
  return fullRangeIlBps(num, den) === fullRangeIlBps(den, num);
}

export const SAMPLE_RATIOS: [bigint, bigint][] = [
  [1n, 4n],
  [1n, 2n],
  [1n, 1n],
  [2n, 1n],
  [4n, 1n],
];

/** ASCII bar for |IL| bps (0–10 blocks, 1000 bps per block). */
export function ilBar(num: bigint, den: bigint): string {
  const mag = ilMagnitudeBps(num, den);
  const filled = Number(mag / 1_000n);
  const clamped = Math.max(0, Math.min(10, filled));
  return `[${"#".repeat(clamped)}${".".repeat(10 - clamped)}] ${fullRangeIlBps(num, den).toString()} bps`;
}
