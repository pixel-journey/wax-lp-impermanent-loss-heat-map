"use client";

import { useEffect, useMemo, useState } from "react";
import { Cases } from "./Cases";
import {
  downloadText,
  exportIlCsv,
  exportIlMarkdown,
} from "./exportReport";
import {
  compareIl,
  feesCoverIl,
  fullRangeIlBps,
  heatGrid,
  heatRow,
  ilBar,
  SAMPLE_RATIOS,
} from "./il";
import { GLOSSARY, IL_MYTHS } from "./myths";
import { decodeShareState, encodeShareState } from "./shareState";
import { WORKED_EXAMPLES } from "./workedExamples";

const LS_KEY = "pxj-il-heat-v1";

export function Demo() {
  const [num, setNum] = useState("2");
  const [den, setDen] = useState("1");
  const [wNum, setWNum] = useState("2");
  const [wDen, setWDen] = useState("1");
  const [shareMsg, setShareMsg] = useState("");
  const [feeBps, setFeeBps] = useState("500");
  const [compare, setCompare] = useState(false);
  const [numB, setNumB] = useState("4");
  const [denB, setDenB] = useState("1");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromUrl = decodeShareState(window.location.search);
    if (fromUrl.num || fromUrl.den) {
      if (fromUrl.num) setNum(fromUrl.num);
      if (fromUrl.den) setDen(fromUrl.den);
      if (fromUrl.wNum) setWNum(fromUrl.wNum);
      if (fromUrl.wDen) setWDen(fromUrl.wDen);
      return;
    }
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const p = JSON.parse(raw) as Record<string, string>;
      if (p.num) setNum(p.num);
      if (p.den) setDen(p.den);
      if (p.wNum) setWNum(p.wNum);
      if (p.wDen) setWDen(p.wDen);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ num, den, wNum, wDen }));
    } catch {
      /* ignore */
    }
  }, [num, den, wNum, wDen]);

  const custom = useMemo(() => {
    try {
      const n = BigInt(num.trim() || "0");
      const d = BigInt(den.trim() || "0");
      const wn = BigInt(wNum.trim() || "0");
      const wd = BigInt(wDen.trim() || "0");
      const il = fullRangeIlBps(n, d);
      const cell = heatRow(n, d, wn, wd);
      const grid = heatGrid(SAMPLE_RATIOS, wn, wd);
      const fees = feesCoverIl(n, d, BigInt(feeBps.trim() || "0"));
      return { ok: true as const, il, bar: ilBar(n, d), grid, cell, fees, n, d };
    } catch (e) {
      return {
        ok: false as const,
        reason: e instanceof Error ? e.message : "Invalid inputs",
      };
    }
  }, [num, den, wNum, wDen, feeBps]);

  const cmp = useMemo(() => {
    if (!compare) return null;
    try {
      return compareIl(
        { num: BigInt(num.trim() || "0"), den: BigInt(den.trim() || "0") },
        { num: BigInt(numB.trim() || "0"), den: BigInt(denB.trim() || "0") }
      );
    } catch {
      return null;
    }
  }, [compare, num, den, numB, denB]);

  const copyShare = async () => {
    const qs = encodeShareState({ num, den, wNum, wDen });
    const path =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}?${qs}`
        : `?${qs}`;
    try {
      await navigator.clipboard.writeText(path);
      setShareMsg("Share URL copied");
    } catch {
      setShareMsg(path);
    }
  };

  return (
    <main className="wrap">
      <style>{`@media print { button, .no-print { display: none !important; } }`}</style>
      <p className="kicker">Educational reference · Pixel Journey</p>
      <h1>Full-range IL heat lab</h1>
      <p className="lede">
        Integer full-range impermanent loss at a price ratio, plus a symmetric teaching
        band. Not concentrated liquidity. Not Alcor.
      </p>

      <section
        className="no-print"
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

      <div className="no-print" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {SAMPLE_RATIOS.map(([n, d]) => (
          <button
            key={`${n}/${d}`}
            type="button"
            onClick={() => {
              setNum(n.toString());
              setDen(d.toString());
            }}
          >
            {n.toString()}/{d.toString()}
          </button>
        ))}
      </div>

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
            IL <strong>{custom.il.toString()}</strong> bps · this ratio inside band:{" "}
            <strong>{custom.cell.inside ? "yes" : "no"}</strong>
          </p>
          <p style={{ fontFamily: "ui-monospace, monospace" }}>{custom.bar}</p>

          <label style={{ display: "block", margin: "1rem 0 0.5rem" }}>
            Flat fee-income bps (sketch only)
            <input
              value={feeBps}
              onChange={(e) => setFeeBps(e.target.value)}
              style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
            />
          </label>
          {custom.fees.ok && (
            <p style={{ fontSize: "0.9rem" }}>
              |IL| {custom.fees.ilMag.toString()} bps ·{" "}
              {custom.fees.covered
                ? "fees cover magnitude (sketch)"
                : `gap ${custom.fees.gap.toString()} bps`}
            </p>
          )}

          <div className="no-print" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() =>
                downloadText(
                  "il-heat.md",
                  exportIlMarkdown({
                    ratio: `${num}/${den}`,
                    ilBps: custom.il.toString(),
                    width: `${wNum}/${wDen}`,
                    grid: custom.grid.map((c) => ({
                      ratio: c.ratio,
                      ilBps: c.ilBps.toString(),
                      inside: String(c.inside),
                    })),
                  })
                )
              }
            >
              Download MD
            </button>
            <button
              type="button"
              onClick={() =>
                downloadText(
                  "il-heat.csv",
                  exportIlCsv(
                    custom.grid.map((c) => ({
                      ratio: c.ratio,
                      ilBps: c.ilBps.toString(),
                      inside: String(c.inside),
                    }))
                  ),
                  "text/csv;charset=utf-8"
                )
              }
            >
              Download CSV
            </button>
            <button type="button" onClick={() => void copyShare()}>
              Copy share URL
            </button>
            <button type="button" onClick={() => window.print()}>
              Print
            </button>
          </div>
          {shareMsg && (
            <p className="no-print" style={{ fontSize: "0.85rem", opacity: 0.8 }}>
              {shareMsg}
            </p>
          )}
          <h2 style={{ fontSize: "1rem", marginTop: "1.5rem" }}>Sample heat row</h2>
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

      <label className="no-print" style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "1.5rem" }}>
        <input
          type="checkbox"
          checked={compare}
          onChange={(e) => setCompare(e.target.checked)}
        />
        Compare against a second ratio
      </label>
      {compare && (
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            B numerator
            <input
              value={numB}
              onChange={(e) => setNumB(e.target.value)}
              style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
            />
          </label>
          <label style={{ display: "block" }}>
            B denominator
            <input
              value={denB}
              onChange={(e) => setDenB(e.target.value)}
              style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
            />
          </label>
        </div>
      )}
      {cmp && (
        <p style={{ fontSize: "0.9rem" }}>
          A {cmp.aBps.toString()} · B {cmp.bBps.toString()} · Δ {cmp.deltaBps.toString()} bps
        </p>
      )}

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Worked anchors</h2>
        <ul style={{ fontSize: "0.9rem" }}>
          {WORKED_EXAMPLES.map((w) => (
            <li key={w.ratio}>
              {w.ratio}
              {"ilBps" in w ? ` → ${w.ilBps} bps` : ""}
              {"note" in w ? ` (${w.note})` : ""}
            </li>
          ))}
        </ul>
      </section>

      <div className="no-print">
        <Cases />
      </div>

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Runbook</h2>
        <ol style={{ fontSize: "0.9rem" }}>
          <li>Pick a sample ratio or enter num/den.</li>
          <li>Read full-range IL bps and meter; check band membership.</li>
          <li>Optional: flat fee-income sketch, compare ratios, export, print, share.</li>
          <li>Do not treat fee sketch as APR or this lab as CL / live Alcor.</li>
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

      <p className="no-print" style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.75 }}>
        URL overrides localStorage when present. See EDUCATION.md · POLICY.md · SECURITY.md
      </p>
    </main>
  );
}
