export function createEmptyGrid(rows = 20, cols = 20) {
  const grid = [];
  for (let row = 0; row < rows; row += 1) {
    const currentRow = [];
    for (let col = 0; col < cols; col += 1) {
      currentRow.push({ state: "empty", row, col });
    }
    grid.push(currentRow);
  }
  return grid;
}

export function cloneGrid(grid) {
  return JSON.parse(JSON.stringify(grid));
}

export function getNeighbors(row, col, grid) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const neighbors = [];
  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length
    ) {
      neighbors.push({ row: newRow, col: newCol });
    }
  }
  return neighbors;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getDelay(speed) {
  return Math.max(8, 280 - speed * 27);
}
