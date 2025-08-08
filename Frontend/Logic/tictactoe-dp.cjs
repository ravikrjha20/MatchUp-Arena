const fs = require("fs");

/* ---------- constants ---------- */
const WIN_MASKS = [
  0b111000000,
  0b000111000,
  0b000000111, // rows
  0b100100100,
  0b010010010,
  0b001001001, // cols
  0b100010001,
  0b001010100, // diags
];

/* ---------- helpers ---------- */
function checkWin(mask) {
  return WIN_MASKS.some((win) => (mask & win) === win);
}

/* DP solver: 0 = draw, 1 = current player wins, 2 = opponent wins */
function getDp(dp, ownMask, oppMask, turn) {
  const cached = dp[ownMask][oppMask][turn];
  if (cached !== -1) return cached;

  if (checkWin(oppMask)) return (dp[ownMask][oppMask][turn] = 2);
  if (checkWin(ownMask)) return (dp[ownMask][oppMask][turn] = 1);
  if ((ownMask | oppMask) === (1 << 9) - 1)
    return (dp[ownMask][oppMask][turn] = 0);

  let isWin = false,
    isDraw = false;

  for (let i = 0; i < 9; i++) {
    if (ownMask & (1 << i) || oppMask & (1 << i)) continue;

    const result = turn
      ? getDp(dp, ownMask, oppMask | (1 << i), 0) // opponent moves
      : getDp(dp, ownMask | (1 << i), oppMask, 1); // we move

    if ((turn && result === 2) || (!turn && result === 1)) isWin = true;
    else if (result === 0) isDraw = true;
  }

  if (isWin) return (dp[ownMask][oppMask][turn] = turn + 1); // 0→1, 1→2
  if (isDraw) return (dp[ownMask][oppMask][turn] = 0);
  return (dp[ownMask][oppMask][turn] = turn ? 1 : 2);
}

/* ---------- main ---------- */
(function main() {
  const N = 9;
  const dp = Array.from({ length: 1 << N }, () =>
    Array.from({ length: 1 << N }, () => [-1, -1])
  );

  // fill DP table from both starting turns
  getDp(dp, 0, 0, 0);
  getDp(dp, 0, 0, 1);

  console.log("Example value dp[1][0][1] =", dp[1][0][1]);

  saveToJSON(dp);
})();

/* ---------- filesystem utility ---------- */
function saveToJSON(dp) {
  console.log("Saving results to tictactoe-outcomes.json…");

  const result = {};
  for (let x = 0; x < 512; x++) {
    for (let o = 0; o < 512; o++) {
      for (let t = 0; t < 2; t++) {
        const val = dp[x][o][t];
        if (val !== -1) result[`${x}-${o}-${t}`] = val;
      }
    }
  }

  fs.writeFileSync("tictactoe-outcomes.json", JSON.stringify(result, null, 2));
  console.log("File written successfully.");
}
