# Education — full-range IL, not Alcor

> **Rung:** `npm test` passes. The formula is full-range impermanent loss for a price ratio, plus a symmetric band check. It is **not** concentrated-liquidity IL. No Alcor pool is read.  
> **The test is the rule.**

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Show that 1/1 is 0 bps and 4/1 is −2000 bps |
| Intermediate | Read the band, the heat row, and the fee-cover sketch |
| Masterclass | Say why a flat fee number is not an APR, and why this is not a range position |

---

## Beginner — one scene

```ts
fullRangeIlBps(1n, 1n)  // 0n
fullRangeIlBps(4n, 1n)  // -2000n
ilMagnitudeBps(4n, 1n)  // 2000n
```

The formula is integer:

```text
2 * isqrt(num * den) * 10000 / (num + den) - 10000
```

`isqrt` truncates. At r = 1 the result is 0. At 4x it is −2000 bps (−20%). The same number comes back for 1/4. Inverse ratios match.

Non-positive ratios throw. Sample ratios (1/4, 1/2, 1/1, 2/1, 4/1) are never positive.

### Words

| Word | Meaning here |
| --- | --- |
| Ratio | `num/den`. 4/1 is a 4x price move |
| IL bps | Signed. 0 at entry. Negative when the ratio moves |
| Magnitude | The absolute value. 2000 at 4x |
| Band | A symmetric width. 2/1 means the ratio must sit between 1/2 and 2 |

### Predict, then run

```bash
npm test
```

1. `insideSymmetric(2n, 1n, 2n, 1n)` is true. `insideSymmetric(4n, 1n, 2n, 1n)` is false.
2. `heatRow(4n, 1n, 2n, 1n).ilBps` is −2000.
3. `heatGrid(SAMPLE_RATIOS, 2n, 1n)` has five cells. The `1/1` cell is 0.

---

## Intermediate — cover is a flat number

`feesCoverIl(4n, 1n, 2000n)` is covered. The same call with 1000 leaves `gap: 1000n`. A negative fee is refused.

That helper compares two basis-point integers. It does not model fees over time, volume, or a fee tier. The source comment says so.

`compareIl` of 1x against 4x returns `{ aBps: 0, bBps: -2000, deltaBps: 2000 }`.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Claim 4x is −50% | Classic 50% figure | −2000 bps (the 2√ r/(1+r)−1 form) | `is zero at entry and -2000 bps at 4x` |
| Treat 4x and 1/4 as different | Asymmetric display | same bps | `is symmetric in inverse ratios` |
| Call a 4x move "inside a 2x band" | Wrong range | false | `marks 4x outside a 2x band` |
| Treat 1000 fee bps as covering 4x IL | Silent gap | covered false, gap 1000 | `1000 fee bps leaves a gap at 4x` |
| Zero ratio | Division or sqrt of 0 | throw | `rejects non-positive ratios` |

---

## Masterclass — this is not a range position

Concentrated liquidity (Uniswap v3 / some Alcor ranges) loses more inside a narrow band and goes to 100% outside it. This file only asks "is the ratio inside a symmetric width?" and still reports the **full-range** IL number. Do not paste the −2000 figure onto a 2x range position.

Still absent:

- An Alcor pool read. Arguments only.
- Fee APR, volume, or in-range time. `feesCoverIl` is a flat compare.
- Token amounts, reserves, or a position NFT.

The integer square root floors. A teaching UI that shows more decimals than the bps integer is decorating the result.

### Exercise

1. IL at 4/1? (−2000. Tested.)
2. Why is 4/1 outside a width of 2/1? (4 > 2. The top check fails. Tested.)
3. Does 2000 fee bps mean the pool earned 20%? (No. It means the caller passed 2000. No pool is read.)

---

## What this course will not teach

- Concentrated-liquidity IL
- A live Alcor heat map
- That fees always cover IL
