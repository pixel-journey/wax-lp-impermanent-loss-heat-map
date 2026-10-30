"use client";

import { useMemo, useState } from "react";
import { SAMPLE_RATIOS, heatRow } from "./il";
import { IL_MYTHS } from "./myths";

export function Demo() {
  const [num, setNum] = useState("2");
  const [den, setDen] = useState("1");
  const [widthNum, setWidthNum] = useState("2");
  const [widthDen, setWidthDen] = useState("1");

  const cells = SAMPLE_RATIOS.map(([n, d]) => heatRow(n, d, 2n, 1n));

  const custom = useMemo(() => {
    try {
      const rn = BigInt(num.trim() || "0");
      const rd = BigInt(den.trim() || "0");
      const wn = BigInt(widthNum.trim() || "0");
      const wd = BigInt(widthDen.trim() || "0");
      return heatRow(rn, rd, wn, wd);
    } catch (e) {
      return e instanceof Error ? e.message : "invalid";
    }
  }, [num, den, widthNum, widthDen]);

  return (
    <main className="wrap">
      <p className="kicker">Educational reference · Pixel Journey</p>
      <h1>Full-range IL, and a range check</h1>
      <p className="lede">
        Full-range impermanent loss at a price ratio. Inside means the ratio sits in a
        symmetric band. Not concentrated-liquidity IL and not an Alcor position.
      </p>

      <section
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid #a855f744",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ fontSize: "1rem", marginTop: 0 }}>Myths vs reality</h2>
        {IL_MYTHS.map((m) => (
          <div key={m.myth} style={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
            <p style={{ margin: 0 }}>
              <strong>Myth:</strong> {m.myth}
            </p>
            <p style={{ margin: "0.25rem 0 0" }}>
              <strong>Reality:</strong> {m.reality}
            </p>
          </div>
        ))}
      </section>

      <table>
        <caption>Sample · width 2/1</caption>
        <thead>
          <tr>
            <th>Price ratio</th>
            <th>Full-range IL bps</th>
            <th>Inside 2x</th>
          </tr>
        </thead>
        <tbody>
          {cells.map((cell) => (
            <tr key={cell.ratio}>
              <td>{cell.ratio}</td>
              <td>{cell.ilBps.toString()}</td>
              <td>{cell.inside ? "yes" : "no"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ fontSize: "1rem", marginTop: "2rem" }}>Custom ratio</h2>
      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        Ratio num / den
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input value={num} onChange={(e) => setNum(e.target.value)} />
          <input value={den} onChange={(e) => setDen(e.target.value)} />
        </div>
      </label>
      <label style={{ display: "block", marginBottom: "0.75rem" }}>
        Width num / den (≥1)
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input value={widthNum} onChange={(e) => setWidthNum(e.target.value)} />
          <input value={widthDen} onChange={(e) => setWidthDen(e.target.value)} />
        </div>
      </label>
      {typeof custom === "string" ? (
        <p>{custom}</p>
      ) : (
        <p>
          {custom.ratio}: IL <strong>{custom.ilBps.toString()}</strong> bps · inside{" "}
          <strong>{custom.inside ? "yes" : "no"}</strong>
        </p>
      )}

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.75 }}>
        See POLICY.md · companions: lp-behavioral-profiler, lp-fee-lifecycle-auditor.
      </p>
    </main>
  );
}
