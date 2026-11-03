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

export function ilMagnitudeBps(num: bigint, den: bigint): bigint {
  const v = fullRangeIlBps(num, den);
  return v < 0n ? -v : v;
}

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

export function ilSymmetric(num: bigint, den: bigint): boolean {
  return fullRangeIlBps(num, den) === fullRangeIlBps(den, num);
}

export function compareIl(
  a: { num: bigint; den: bigint },
  b: { num: bigint; den: bigint }
): { aBps: bigint; bBps: bigint; deltaBps: bigint } {
  const aBps = fullRangeIlBps(a.num, a.den);
  const bBps = fullRangeIlBps(b.num, b.den);
  return { aBps, bBps, deltaBps: aBps - bBps };
}

/**
 * Educational sketch only: whether fee income in bps would cover |IL|
 * if fees were credited as a single flat number (not a live fee APR model).
 */
export function feesCoverIl(
  num: bigint,
  den: bigint,
  feeIncomeBps: bigint
): { ok: false; reason: string } | { ok: true; ilMag: bigint; covered: boolean; gap: bigint } {
  if (feeIncomeBps < 0n) return { ok: false, reason: "feeIncomeBps must be non-negative" };
  const ilMag = ilMagnitudeBps(num, den);
  const covered = feeIncomeBps >= ilMag;
  const gap = covered ? 0n : ilMag - feeIncomeBps;
  return { ok: true, ilMag, covered, gap };
}

export const SAMPLE_RATIOS: [bigint, bigint][] = [
  [1n, 4n],
  [1n, 2n],
  [1n, 1n],
  [2n, 1n],
  [4n, 1n],
];

export function ilBar(num: bigint, den: bigint): string {
  const mag = ilMagnitudeBps(num, den);
  const filled = Number(mag / 1_000n);
  const clamped = Math.max(0, Math.min(10, filled));
  return `[${"#".repeat(clamped)}${".".repeat(10 - clamped)}] ${fullRangeIlBps(num, den).toString()} bps`;
}
