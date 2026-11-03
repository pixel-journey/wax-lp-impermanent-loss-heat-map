import { describe, expect, it } from "vitest";
import {
  compareIl,
  feesCoverIl,
  fullRangeIlBps,
  heatGrid,
  heatRow,
  ilMagnitudeBps,
  ilSymmetric,
  insideSymmetric,
  isqrt,
} from "./il";

describe("isqrt", () => {
  it("roots small squares", () => {
    expect(isqrt(0n)).toBe(0n);
    expect(isqrt(4n)).toBe(2n);
    expect(isqrt(9n)).toBe(3n);
  });
});

describe("full-range IL", () => {
  it("is zero at entry and -2000 bps at 4x", () => {
    expect(fullRangeIlBps(1n, 1n)).toBe(0n);
    expect(fullRangeIlBps(4n, 1n)).toBe(-2000n);
    expect(ilMagnitudeBps(4n, 1n)).toBe(2000n);
  });

  it("is symmetric in inverse ratios", () => {
    expect(ilSymmetric(4n, 1n)).toBe(true);
    expect(fullRangeIlBps(4n, 1n)).toBe(fullRangeIlBps(1n, 4n));
  });

  it("marks 4x outside a 2x band", () => {
    expect(insideSymmetric(2n, 1n, 2n, 1n)).toBe(true);
    expect(insideSymmetric(4n, 1n, 2n, 1n)).toBe(false);
    expect(heatRow(4n, 1n, 2n, 1n).ilBps).toBe(-2000n);
  });

  it("builds a heat grid", () => {
    const g = heatGrid(
      [
        [1n, 1n],
        [2n, 1n],
      ],
      2n,
      1n
    );
    expect(g[0].ilBps).toBe(0n);
  });
});

describe("compareIl", () => {
  it("delta between 1x and 4x", () => {
    const c = compareIl({ num: 1n, den: 1n }, { num: 4n, den: 1n });
    expect(c.aBps).toBe(0n);
    expect(c.bBps).toBe(-2000n);
    expect(c.deltaBps).toBe(2000n);
  });
});

describe("feesCoverIl", () => {
  it("2000 fee bps covers 4x IL magnitude", () => {
    const r = feesCoverIl(4n, 1n, 2000n);
    expect(r.ok && r.covered).toBe(true);
  });
  it("1000 fee bps leaves a gap at 4x", () => {
    const r = feesCoverIl(4n, 1n, 1000n);
    expect(r.ok && r.covered).toBe(false);
    expect(r.ok && r.gap).toBe(1000n);
  });
});
