import { describe, expect, it } from "vitest";
import { fullRangeIlBps, heatRow, insideSymmetric } from "./il";

describe("full-range IL", () => {
  it("is zero at the entry price and -2000 bps at 4x", () => {
    expect(fullRangeIlBps(1n, 1n)).toBe(0n);
    expect(fullRangeIlBps(4n, 1n)).toBe(-2000n);
  });

  it("marks 4x outside a 2x symmetric range", () => {
    expect(insideSymmetric(2n, 1n, 2n, 1n)).toBe(true);
    expect(insideSymmetric(4n, 1n, 2n, 1n)).toBe(false);
    const cell = heatRow(4n, 1n, 2n, 1n);
    expect(cell.inside).toBe(false);
    expect(cell.ilBps).toBe(-2000n);
  });
});
