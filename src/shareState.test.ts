import { describe, expect, it } from "vitest";
import { decodeShareState, encodeShareState } from "./shareState";

describe("shareState", () => {
  it("round-trips", () => {
    const raw = encodeShareState({ num: "4", den: "1", wNum: "2", wDen: "1" });
    const d = decodeShareState(raw);
    expect(d.num).toBe("4");
    expect(d.wNum).toBe("2");
  });
});
