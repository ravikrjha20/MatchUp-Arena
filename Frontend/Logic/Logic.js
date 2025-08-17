import dp from "../../tictactoe-outcomes.json";

// Constants
export const OUTCOME = { WIN: 1, DRAW: 0, LOSS: 2 };

export const WIN_PATTERNS = [
  0b000000111,
  0b000111000,
  0b111000000, // rows
  0b001001001,
  0b010010010,
  0b100100100, // columns
  0b100010001,
  0b001010100, // diagonals
];

// ----------------------------
// Helper Functions
// ----------------------------

/**
 * Checks if adding a move (bit) to mask results in a win.
 */
export function checkWin(mask) {
  return WIN_PATTERNS.some((pattern) => (mask & pattern) === pattern);
}

export function isWinningMove(mask, bit) {
  const newMask = mask | bit;
  return WIN_PATTERNS.some((pattern) => (newMask & pattern) === pattern);
}

/**
 * Returns indices of all empty cells.
 */
export function getEmptyCells(own, opp) {
  const empties = [];
  for (let i = 0; i < 9; i++) {
    const bit = 1 << i;
    if ((own & bit) === 0 && (opp & bit) === 0) {
      empties.push(i);
    }
  }
  return empties;
}

// ----------------------------
// Mode Logic
// ----------------------------

/**
 * Easy Mode: win if possible, else random
 */
export function easyMode(own, opp) {
  const empties = getEmptyCells(own, opp);
  for (const i of empties) {
    if (isWinningMove(own, 1 << i)) return i;
  }
  return empties.length
    ? empties[Math.floor(Math.random() * empties.length)]
    : -1;
}

/**
 * Medium Mode: win > block > random
 */
export function mediumMode(own, opp) {
  const empties = getEmptyCells(own, opp);

  // Try to win
  for (const i of empties) {
    if (isWinningMove(own, 1 << i)) return i;
  }

  // Try to block opponent
  for (const i of empties) {
    if (isWinningMove(opp, 1 << i)) return i;
  }

  // Else random
  return empties.length
    ? empties[Math.floor(Math.random() * empties.length)]
    : -1;
}

/**
 * Hard Mode: use precomputed outcome DP
 */
export function hardMode(own, opp) {
  // console.log("own: ", own, ", opp: ", opp);
  const empties = getEmptyCells(own, opp);
  let drawMoves = [];

  for (const i of empties) {
    const bit = 1 << i;
    const nextOwn = own | bit;
    const nextOpp = opp;

    // console.log("nextOwn: ", nextOwn)

    const key = `${nextOwn}-${nextOpp}-1`;
    const outcome = dp[key];

    // console.log("key: ", key, ", outcome: ", outcome);

    if (outcome === OUTCOME.WIN) return i;
    if (outcome === OUTCOME.DRAW) drawMoves.push(i);
    // Skip if LOSS
  }

  return drawMoves.length
    ? drawMoves[Math.floor(Math.random() * drawMoves.length)]
    : -1;
}

// ----------------------------
// Public API
// ----------------------------

/**
 * Get AI Move based on mode
 */
export function getMove(mode, own, opp) {
  switch (mode) {
    case "easy":
      return easyMode(own, opp);
    case "medium":
      return mediumMode(own, opp);
    case "hard":
      return hardMode(own, opp);
    case "1v1":
      return -1;
    default:
      console.error("Unknown mode:", mode);
      return -1;
  }
}
