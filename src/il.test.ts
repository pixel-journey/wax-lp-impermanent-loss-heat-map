import { describe, expect, it } from "vitest";
import {
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
    expect(isqrt(1n)).toBe(1n);
    expect(isqrt(4n)).toBe(2n);
    expect(isqrt(9n)).toBe(3n);
  });
});

describe("full-range IL", () => {
  it("is zero at the entry price and -2000 bps at 4x", () => {
    expect(fullRangeIlBps(1n, 1n)).toBe(0n);
    expect(fullRangeIlBps(4n, 1n)).toBe(-2000n);
    expect(ilMagnitudeBps(4n, 1n)).toBe(2000n);
  });

  it("is symmetric in inverse ratios", () => {
    expect(ilSymmetric(4n, 1n)).toBe(true);
    expect(fullRangeIlBps(4n, 1n)).toBe(fullRangeIlBps(1n, 4n));
  });

  it("marks 4x outside a 2x symmetric range", () => {
    expect(insideSymmetric(2n, 1n, 2n, 1n)).toBe(true);
    expect(insideSymmetric(4n, 1n, 2n, 1n)).toBe(false);
    const cell = heatRow(4n, 1n, 2n, 1n);
    expect(cell.inside).toBe(false);
    expect(cell.ilBps).toBe(-2000n);
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
    expect(g).toHaveLength(2);
    expect(g[0].ilBps).toBe(0n);
  });
});
