"use client";

import { useMemo, useState } from "react";
import {
  fullRangeIlBps,
  heatGrid,
  ilBar,
  SAMPLE_RATIOS,
} from "./il";
import { GLOSSARY, IL_MYTHS } from "./myths";

export function Demo() {
  const [num, setNum] = useState("2");
  const [den, setDen] = useState("1");
  const [wNum, setWNum] = useState("2");
  const [wDen, setWDen] = useState("1");

  const custom = useMemo(() => {
    try {
      const n = BigInt(num.trim() || "0");
      const d = BigInt(den.trim() || "0");
      const wn = BigInt(wNum.trim() || "0");
      const wd = BigInt(wDen.trim() || "0");
      const il = fullRangeIlBps(n, d);
      const grid = heatGrid(SAMPLE_RATIOS, wn, wd);
      return { ok: true as const, il, bar: ilBar(n, d), grid, wn, wd };
    } catch (e) {
      return {
        ok: false as const,
        reason: e instanceof Error ? e.message : "Invalid inputs",
      };
    }
  }, [num, den, wNum, wDen]);

  return (
    <main className="wrap">
      <p className="kicker">Educational reference · Pixel Journey</p>
      <h1>Full-range IL heat lab</h1>
      <p className="lede">
        Integer full-range impermanent loss at a price ratio, plus a symmetric teaching
        band. Not concentrated liquidity. Not Alcor.
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

      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        Ratio numerator
        <input
          value={num}
          onChange={(e) => setNum(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        Ratio denominator
        <input
          value={den}
          onChange={(e) => setDen(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        Width numerator (≥ den for width ≥ 1)
        <input
          value={wNum}
          onChange={(e) => setWNum(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "1rem" }}>
        Width denominator
        <input
          value={wDen}
          onChange={(e) => setWDen(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
        />
      </label>

      {custom.ok ? (
        <>
          <p>
            IL <strong>{custom.il.toString()}</strong> bps
          </p>
          <p style={{ fontFamily: "ui-monospace, monospace" }}>{custom.bar}</p>
          <h2 style={{ fontSize: "1rem" }}>Sample heat row</h2>
          <table>
            <thead>
              <tr>
                <th>ratio</th>
                <th>ilBps</th>
                <th>inside width</th>
              </tr>
            </thead>
            <tbody>
              {custom.grid.map((c) => (
                <tr key={c.ratio}>
                  <td>{c.ratio}</td>
                  <td>{c.ilBps.toString()}</td>
                  <td>{c.inside ? "yes" : "no"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>{custom.reason}</p>
      )}

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Runbook</h2>
        <ol style={{ fontSize: "0.9rem" }}>
          <li>Enter a positive price ratio (num/den).</li>
          <li>Read full-range IL bps and meter.</li>
          <li>Set a teaching width; inspect which sample ratios sit inside.</li>
          <li>Do not treat this as concentrated-liquidity or live Alcor IL.</li>
        </ol>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Glossary</h2>
        <dl>
          {GLOSSARY.map((g) => (
            <div key={g.term} style={{ marginBottom: "0.5rem" }}>
              <dt>
                <strong>{g.term}</strong>
              </dt>
              <dd style={{ margin: 0 }}>{g.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.75 }}>
        See EDUCATION.md · POLICY.md · SECURITY.md · companions: fee-lifecycle, migration
        tracker, LP profiler
      </p>
    </main>
  );
}
