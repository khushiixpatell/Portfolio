export const ROWS = 6;
export const COLUMNS = 7;

export const EMPTY = 0;
export const PLAYER1 = 1;
export const PLAYER2 = 2;

export function createBoard() {
  return Array.from({ length: ROWS }, () =>
    Array(COLUMNS).fill(EMPTY)
  );
}

export function legalMoves(board) {
  const moves = [];

  for (let col = 0; col < COLUMNS; col++) {
    if (board[0][col] === EMPTY) {
      moves.push(col);
    }
  }

  return moves;
}

export function applyMove(board, col, player) {
  const nextBoard = board.map((row) => [...row]);

  for (let row = ROWS - 1; row >= 0; row--) {
    if (nextBoard[row][col] === EMPTY) {
      nextBoard[row][col] = player;
      return nextBoard;
    }
  }

  return null;
}

export function checkWin(board, player) {
  // Horizontal
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // Vertical
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      ) {
        return true;
      }
    }
  }

  // Diagonal down-right
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // Diagonal up-right
  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
}

export function winner(board) {
  if (checkWin(board, PLAYER1)) return PLAYER1;
  if (checkWin(board, PLAYER2)) return PLAYER2;
  return null;
}

export function isDraw(board) {
  return !winner(board) && legalMoves(board).length === 0;
}

export function isTerminal(board) {
  return Boolean(winner(board)) || isDraw(board);
}

/* ---------------- Random Agent ---------------- */

export function randomAgent(board, random = Math.random) {
  const moves = legalMoves(board);

  if (!moves.length) {
    return null;
  }

  return moves[Math.floor(random() * moves.length)];
}

/* ---------------- Rule-Based Agent ---------------- */

function openLineScore(board, player) {
  const opponent =
    player === PLAYER1 ? PLAYER2 : PLAYER1;

  let score = 0;
  const windows = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      windows.push(board[row].slice(col, col + 4));
    }
  }

  for (let col = 0; col < COLUMNS; col++) {
    const column = board.map((row) => row[col]);

    for (let row = 0; row < ROWS - 3; row++) {
      windows.push(column.slice(row, row + 4));
    }
  }

  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      windows.push(
        [0, 1, 2, 3].map(
          (i) => board[row + i][col + i]
        )
      );
    }
  }

  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      windows.push(
        [0, 1, 2, 3].map(
          (i) => board[row - i][col + i]
        )
      );
    }
  }

  for (const window of windows) {
    if (window.includes(opponent)) {
      continue;
    }

    const ownCount = window.filter(
      (cell) => cell === player
    ).length;

    const emptyCount = window.filter(
      (cell) => cell === EMPTY
    ).length;

    if (ownCount === 3 && emptyCount === 1) {
      score += 100;
    } else if (ownCount === 2 && emptyCount === 2) {
      score += 10;
    } else if (ownCount === 1 && emptyCount === 3) {
      score += 1;
    }
  }

  return score;
}

function winningMoves(board, player, moves) {
  return moves.filter((move) => {
    const nextBoard = applyMove(board, move, player);
    return nextBoard && checkWin(nextBoard, player);
  });
}

export function ruleAgent(board, player, random = Math.random) {
  const moves = legalMoves(board);

  if (!moves.length) {
    return null;
  }

  const opponent =
    player === PLAYER1 ? PLAYER2 : PLAYER1;

  // Rule 1: immediate win
  const wins = winningMoves(board, player, moves);

  if (wins.length) {
    return wins[Math.floor(random() * wins.length)];
  }

  // Rule 2: block opponent
  const blocks = winningMoves(board, opponent, moves);

  if (blocks.length) {
    return blocks[Math.floor(random() * blocks.length)];
  }

  // Rule 3: center
  const center = Math.floor(COLUMNS / 2);

  if (moves.includes(center)) {
    return center;
  }

  // Rule 4: strongest open line
  const scoredMoves = moves.map((move) => {
    const nextBoard = applyMove(board, move, player);

    return {
      move,
      score: openLineScore(nextBoard, player),
    };
  });

  const bestScore = Math.max(
    ...scoredMoves.map((item) => item.score)
  );

  const bestMoves = scoredMoves
    .filter((item) => item.score === bestScore)
    .map((item) => item.move);

  if (bestScore > 0) {
    return bestMoves[
      Math.floor(random() * bestMoves.length)
    ];
  }

  // Rule 5: closest to center
  const minimumDistance = Math.min(
    ...moves.map((move) => Math.abs(move - center))
  );

  const closestMoves = moves.filter(
    (move) => Math.abs(move - center) === minimumDistance
  );

  return closestMoves[
    Math.floor(random() * closestMoves.length)
  ];
}

/* ---------------- Minimax Agent ---------------- */

function evaluateWindow(window, player) {
  const opponent =
    player === PLAYER1 ? PLAYER2 : PLAYER1;

  const playerCount = window.filter(
    (cell) => cell === player
  ).length;

  const opponentCount = window.filter(
    (cell) => cell === opponent
  ).length;

  const emptyCount = window.filter(
    (cell) => cell === EMPTY
  ).length;

  let score = 0;

  if (playerCount === 4) {
    score += 1000;
  } else if (playerCount === 3 && emptyCount === 1) {
    score += 10;
  } else if (playerCount === 2 && emptyCount === 2) {
    score += 5;
  }

  if (opponentCount === 3 && emptyCount === 1) {
    score -= 80;
  } else if (opponentCount === 2 && emptyCount === 2) {
    score -= 5;
  }

  return score;
}

function heuristic(board, player) {
  let score = 0;

  const center = Math.floor(COLUMNS / 2);

  const centerValues = board.map(
    (row) => row[center]
  );

  score +=
    centerValues.filter(
      (cell) => cell === player
    ).length * 3;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      score += evaluateWindow(
        board[row].slice(col, col + 4),
        player
      );
    }
  }

  for (let col = 0; col < COLUMNS; col++) {
    const column = board.map((row) => row[col]);

    for (let row = 0; row < ROWS - 3; row++) {
      score += evaluateWindow(
        column.slice(row, row + 4),
        player
      );
    }
  }

  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      score += evaluateWindow(
        [0, 1, 2, 3].map(
          (i) => board[row + i][col + i]
        ),
        player
      );
    }
  }

  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS - 3; col++) {
      score += evaluateWindow(
        [0, 1, 2, 3].map(
          (i) => board[row - i][col + i]
        ),
        player
      );
    }
  }

  return score;
}

function minimax(
  board,
  depth,
  maximizing,
  agentPlayer
) {
  const opponent =
    agentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;

  if (isTerminal(board)) {
    const gameWinner = winner(board);

    if (gameWinner === agentPlayer) {
      return {
        move: null,
        score: 100000,
      };
    }

    if (gameWinner === opponent) {
      return {
        move: null,
        score: -100000,
      };
    }

    return {
      move: null,
      score: 0,
    };
  }

  if (depth === 0) {
    return {
      move: null,
      score: heuristic(board, agentPlayer),
    };
  }

  const moves = legalMoves(board);

  let bestValue = maximizing
    ? -Infinity
    : Infinity;

  let bestMoves = [];

  for (const move of moves) {
    const nextBoard = applyMove(
      board,
      move,
      maximizing ? agentPlayer : opponent
    );

    const result = minimax(
      nextBoard,
      depth - 1,
      !maximizing,
      agentPlayer
    );

    if (
      (maximizing && result.score > bestValue) ||
      (!maximizing && result.score < bestValue)
    ) {
      bestValue = result.score;
      bestMoves = [move];
    } else if (result.score === bestValue) {
      bestMoves.push(move);
    }
  }

  return {
    move:
      bestMoves[
        Math.floor(Math.random() * bestMoves.length)
      ],
    score: bestValue,
  };
}

export function minimaxAgent(
  board,
  player,
  depth = 4
) {
  return minimax(
    board,
    depth,
    true,
    player
  ).move;
}

export function getAgentMove(
  agent,
  board,
  player,
  depth
) {
  if (agent === "Random") {
    return randomAgent(board);
  }

  if (agent === "Rule-Based") {
    return ruleAgent(board, player);
  }

  return minimaxAgent(
    board,
    player,
    depth
  );
}