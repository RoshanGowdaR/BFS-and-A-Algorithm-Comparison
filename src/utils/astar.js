import { getDelay, sleep } from "./gridHelpers.js";

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

class MinHeap {
  constructor() {
    this.items = [];
  }

  push(node) {
    this.items.push(node);
    this.items.sort((a, b) => a.f - b.f);
  }

  pop() {
    return this.items.shift();
  }

  get size() {
    return this.items.length;
  }
}

// ============================================================
// PART 3: A* will be implemented here
// ============================================================
export async function runAstar(
  grid,
  start,
  end,
  onVisit,
  onPath,
  setStats,
  speed
) {
  const startTime = Date.now();
  let nodesExplored = 0;
  const gScore = new Map();
  const parent = new Map();
  const closedSet = new Set();
  const openSet = new MinHeap();

  const startNode = {
    row: start.row,
    col: start.col,
    g: 0,
    h: heuristic(start, end),
    f: heuristic(start, end),
  };

  openSet.push(startNode);
  gScore.set(`${start.row},${start.col}`, 0);

  while (openSet.size > 0) {
    const current = openSet.pop();
    const key = `${current.row},${current.col}`;

    if (closedSet.has(key)) {
      continue;
    }

    closedSet.add(key);
    nodesExplored += 1;

    if (current.row === end.row && current.col === end.col) {
      const path = [];
      let node = end;

      while (node) {
        path.push({ row: node.row, col: node.col });
        node = parent.get(`${node.row},${node.col}`);
      }

      path.reverse();
      await onPath(path);
      setStats({
        nodesExplored,
        pathLength: path.length,
        timeMs: Date.now() - startTime,
      });
      return;
    }

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (const [dr, dc] of directions) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      const nKey = `${nr},${nc}`;

      if (nr < 0 || nr >= 20 || nc < 0 || nc >= 20) {
        continue;
      }

      if (grid[nr][nc].state === "wall") {
        continue;
      }

      if (closedSet.has(nKey)) {
        continue;
      }

      const tentativeG = current.g + 1;
      const knownG = gScore.get(nKey) ?? Infinity;

      if (tentativeG < knownG) {
        gScore.set(nKey, tentativeG);
        parent.set(nKey, current);
        const h = heuristic({ row: nr, col: nc }, end);
        openSet.push({ row: nr, col: nc, g: tentativeG, h, f: tentativeG + h });

        if (grid[nr][nc].state !== "start" && grid[nr][nc].state !== "end") {
          await onVisit(nr, nc);
        }
      }
    }
  }

  setStats({
    nodesExplored,
    pathLength: 0,
    timeMs: Date.now() - startTime,
  });
}
