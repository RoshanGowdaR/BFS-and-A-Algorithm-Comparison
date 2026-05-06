export function generateMaze(rows = 20, cols = 20) {
  const makeGrid = () => {
    const grid = [];
    for (let row = 0; row < rows; row += 1) {
      const currentRow = [];
      for (let col = 0; col < cols; col += 1) {
        currentRow.push({ state: "wall", row, col });
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const carveMaze = (grid) => {
    const visited = new Set();
    const stack = [];

    grid[1][1].state = "empty";
    visited.add("1,1");
    stack.push({ row: 1, col: 1 });

    const directions = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ];

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const unvisitedNeighbors = [];

      for (const [dr, dc] of directions) {
        const nr = current.row + dr;
        const nc = current.col + dc;
        if (nr >= 1 && nr <= rows - 2 && nc >= 1 && nc <= cols - 2) {
          const key = `${nr},${nc}`;
          if (!visited.has(key)) {
            unvisitedNeighbors.push({ row: nr, col: nc });
          }
        }
      }

      if (unvisitedNeighbors.length > 0) {
        for (let i = unvisitedNeighbors.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [unvisitedNeighbors[i], unvisitedNeighbors[j]] = [
            unvisitedNeighbors[j],
            unvisitedNeighbors[i],
          ];
        }

        const next = unvisitedNeighbors[0];
        const wallRow = (current.row + next.row) / 2;
        const wallCol = (current.col + next.col) / 2;

        grid[wallRow][wallCol].state = "empty";
        grid[next.row][next.col].state = "empty";

        visited.add(`${next.row},${next.col}`);
        stack.push(next);
      } else {
        stack.pop();
      }
    }
  };

  const openStartEnd = (grid) => {
    grid[0][0].state = "start";
    grid[0][1].state = "empty";
    grid[1][0].state = "empty";
    grid[1][1].state = "empty";

    grid[rows - 1][cols - 1].state = "end";
    grid[rows - 1][cols - 2].state = "empty";
    grid[rows - 2][cols - 1].state = "empty";
    grid[rows - 2][cols - 2].state = "empty";
  };

  const connectEndToMaze = (grid) => {
    const target = { row: rows - 2, col: cols - 2 };
    if (grid[target.row][target.col].state === "wall") {
      grid[target.row][target.col].state = "empty";
    }

    let r = rows - 1;
    let c = cols - 1;
    const steps = [];

    while (r !== target.row || c !== target.col) {
      const options = [];
      if (r > target.row) {
        options.push([-1, 0]);
      }
      if (c > target.col) {
        options.push([0, -1]);
      }
      if (r < target.row) {
        options.push([1, 0]);
      }
      if (c < target.col) {
        options.push([0, 1]);
      }

      const pick = options[Math.floor(Math.random() * options.length)];
      r += pick[0];
      c += pick[1];
      steps.push([r, c]);
    }

    for (const [row, col] of steps) {
      if (grid[row][col].state === "wall") {
        grid[row][col].state = "empty";
      }
    }

    grid[rows - 1][cols - 1].state = "end";
  };

  const openLastColumn = (grid) => {
    for (let row = 0; row < rows; row += 1) {
      grid[row][cols - 1].state = "empty";
    }
    grid[rows - 1][cols - 1].state = "end";
  };

  const connectSecondLastColumn = (grid, openings = 2) => {
    const rowsPool = [];
    for (let row = 1; row <= rows - 2; row += 1) {
      rowsPool.push(row);
    }
    for (let i = rowsPool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [rowsPool[i], rowsPool[j]] = [rowsPool[j], rowsPool[i]];
    }

    const openToMaze = (row, colStart) => {
      let col = colStart;
      while (col >= 1) {
        if (grid[row][col].state === "empty") {
          break;
        }
        grid[row][col].state = "empty";
        col -= 1;
      }
    };

    let opened = 0;
    for (const row of rowsPool) {
      if (opened >= openings) {
        break;
      }
      grid[row][cols - 2].state = "empty";
      openToMaze(row, cols - 3);
      opened += 1;
    }
  };

  const addLoops = (grid, attempts = 90) => {
    for (let i = 0; i < attempts; i += 1) {
      const row = 1 + Math.floor(Math.random() * (rows - 2));
      const col = 1 + Math.floor(Math.random() * (cols - 2));
      if (grid[row][col].state !== "wall") {
        continue;
      }

      const horizontalOpen =
        grid[row][col - 1].state !== "wall" &&
        grid[row][col + 1].state !== "wall";
      const verticalOpen =
        grid[row - 1][col].state !== "wall" &&
        grid[row + 1][col].state !== "wall";

      if (horizontalOpen || verticalOpen) {
        grid[row][col].state = "empty";
      }
    }
  };

  let grid = makeGrid();
  carveMaze(grid);
  openStartEnd(grid);
  connectEndToMaze(grid);
  openLastColumn(grid);
  connectSecondLastColumn(grid, 3);
  addLoops(grid, 160);

  return grid;
}
