export type ShareState = {
  num: string;
  den: string;
  wNum: string;
  wDen: string;
};

export function encodeShareState(s: ShareState): string {
  const q = new URLSearchParams();
  q.set("n", s.num);
  q.set("d", s.den);
  q.set("wn", s.wNum);
  q.set("wd", s.wDen);
  return q.toString();
}

export function decodeShareState(search: string): Partial<ShareState> {
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const out: Partial<ShareState> = {};
  if (q.has("n")) out.num = q.get("n") ?? undefined;
  if (q.has("d")) out.den = q.get("d") ?? undefined;
  if (q.has("wn")) out.wNum = q.get("wn") ?? undefined;
  if (q.has("wd")) out.wDen = q.get("wd") ?? undefined;
  return out;
}
