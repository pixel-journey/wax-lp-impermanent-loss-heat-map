export function exportIlMarkdown(input: {
  ratio: string;
  ilBps: string;
  width: string;
  grid: { ratio: string; ilBps: string; inside: string }[];
}): string {
  const lines = [
    "# Full-range IL (educational)",
    "",
    "> Not concentrated liquidity. Not Alcor.",
    "",
    `ratio: ${input.ratio}`,
    `ilBps: ${input.ilBps}`,
    `width: ${input.width}`,
    "",
    "## Sample grid",
    "",
  ];
  for (const g of input.grid) {
    lines.push(`- ${g.ratio}: ${g.ilBps} bps · inside=${g.inside}`);
  }
  lines.push("");
  return lines.join("\n");
}

export function exportIlCsv(
  rows: { ratio: string; ilBps: string; inside: string }[]
): string {
  const lines = ["ratio,il_bps,inside"];
  for (const r of rows) {
    lines.push(`${r.ratio},${r.ilBps},${r.inside}`);
  }
  lines.push("");
  return lines.join("\n");
}

export function downloadText(
  filename: string,
  content: string,
  mime = "text/plain;charset=utf-8"
): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
