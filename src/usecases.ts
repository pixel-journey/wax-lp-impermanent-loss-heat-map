import { HISTORY_ORIGIN, historyActions } from "./api";
import { fullRangeIlBps, insideSymmetric } from "./il";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

export const USE_CASES: UseCase[] = [
  {
    title: "Transfers on swap.alcor are not a volatility path",
    detail: "Hyperion can list eosio.token transfers that name swap.alcor. That is not a price series, and fullRangeIlBps does not read it.",
    request: historyActions(HISTORY_ORIGIN, "swap.alcor", "eosio.token:transfer", 20),
    transaction: null,
  },
  {
    title: "The market list is not a position",
    detail: `At 4x, full-range IL is ${fullRangeIlBps(4n, 1n).toString()} bps. A 2x symmetric range does ${insideSymmetric(4n, 1n, 2n, 1n) ? "" : "not "}cover it. No liquidity action is built.`,
    request: { method: "GET", url: "https://wax.alcor.exchange/api/markets", executed: false },
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (fullRangeIlBps(1n, 1n) !== 0n) throw new Error("flat");
  if (USE_CASES.some((item) => item.transaction)) throw new Error("no lp transaction");
}
