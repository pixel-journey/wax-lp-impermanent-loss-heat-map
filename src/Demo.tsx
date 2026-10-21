"use client";

import { SAMPLE_RATIOS, heatRow } from "./il";

export function Demo() {
  const cells = SAMPLE_RATIOS.map(([num, den]) => heatRow(num, den, 2n, 1n));
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>Full-range IL, and a range check</h1>
      <p className="lede">
        The number is full-range impermanent loss at that price ratio. Inside means the ratio sits in a symmetric 2x band. It is not concentrated-liquidity IL and not an Alcor position.
      </p>
      <table>
        <caption>Width 2/1</caption>
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
    </main>
  );
}
