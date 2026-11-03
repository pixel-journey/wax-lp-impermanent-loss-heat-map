"use client";

const CASES = [
  {
    title: "Entry",
    body: "ratio 1/1 → IL 0 bps.",
  },
  {
    title: "4× move",
    body: "ratio 4/1 → −2000 bps under the full-range formula.",
  },
  {
    title: "Inverse symmetry",
    body: "4/1 and 1/4 share the same IL bps.",
  },
  {
    title: "Teaching band",
    body: "width 2 keeps 2× inside and marks 4× outside — not CL ticks.",
  },
  {
    title: "Not Alcor",
    body: "No pool is read; ratios are arguments.",
  },
] as const;

export function Cases() {
  return (
    <section aria-label="Teaching cases" style={{ marginTop: "2rem" }}>
      <h2 style={{ fontSize: "1rem" }}>Cases</h2>
      <ul style={{ paddingLeft: "1.2rem", fontSize: "0.9rem" }}>
        {CASES.map((c) => (
          <li key={c.title} style={{ marginBottom: "0.5rem" }}>
            <strong>{c.title}.</strong> {c.body}
          </li>
        ))}
      </ul>
    </section>
  );
}
