import { getDelay, sleep } from "./gridHelpers.js";

// ============================================================
// PART 2: BFS will be implemented here
// ============================================================
export async function runBFS(
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
  const queue = [start];
  const visited = new Set([`${start.row},${start.col}`]);
  const parent = new Map();

  while (queue.length > 0) {
    const current = queue.shift();
    nodesExplored += 1;

    if (current.row === end.row && current.col === end.col) {
      const path = [];
      let key = `${end.row},${end.col}`;
      let node = end;

      while (node) {
        path.push({ row: node.row, col: node.col });
        key = `${node.row},${node.col}`;
        node = parent.get(key);
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

      if (nr < 0 || nr >= 20 || nc < 0 || nc >= 20) {
        continue;
      }

      if (grid[nr][nc].state === "wall") {
        continue;
      }

      const key = `${nr},${nc}`;
      if (visited.has(key)) {
        continue;
      }

      visited.add(key);
      parent.set(key, current);
      queue.push({ row: nr, col: nc });

      if (grid[nr][nc].state !== "start" && grid[nr][nc].state !== "end") {
        await onVisit(nr, nc);
      }
    }
  }

  setStats({
    nodesExplored,
    pathLength: 0,
    timeMs: Date.now() - startTime,
  });
}
