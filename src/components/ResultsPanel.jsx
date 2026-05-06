export default function ResultsPanel({ bfsStats, astarStats, show }) {
  if (!show) {
    return null;
  }

  const nodesDiff = bfsStats.nodesExplored - astarStats.nodesExplored;
  const pct = bfsStats.nodesExplored > 0
    ? Math.round((nodesDiff / bfsStats.nodesExplored) * 100)
    : 0;
  const noPath = bfsStats.pathLength === 0;
  const astarWins = astarStats.nodesExplored < bfsStats.nodesExplored;

  return (
    <section
      className="mx-4 mb-6 mt-2 bg-gray-900 border border-gray-700 rounded-2xl p-8"
      style={{ boxShadow: "0 -4px 30px rgba(99, 102, 241, 0.1)" }}
    >
      <div
        className="font-bold text-2xl text-center mb-8"
        style={{
          background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        📊 Algorithm Comparison Results
      </div>

      <div className="flex gap-6 mb-6 flex-wrap">
        <div className="bg-blue-950/50 border border-blue-500/40 rounded-xl p-6 flex-1 glow-blue">
          <div className="text-blue-400 font-bold text-lg mb-4">🔵 BFS</div>
          <div className="flex justify-between items-center py-2 border-b border-blue-900/50">
            <span className="text-gray-400 text-sm">Nodes Explored</span>
            <span className="text-white font-bold text-xl">
              {bfsStats.nodesExplored}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-blue-900/50">
            <span className="text-gray-400 text-sm">Path Length</span>
            <span className="text-white font-bold text-xl">
              {bfsStats.pathLength} cells
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-blue-900/50">
            <span className="text-gray-400 text-sm">Time Taken</span>
            <span className="text-white font-bold text-xl">
              {bfsStats.timeMs}ms
            </span>
          </div>
          <div className="bg-blue-900 text-blue-300 text-xs px-3 py-1 rounded-full mt-4 inline-block">
            Exhaustive Search
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 px-2">
          <div className="text-gray-600 font-black text-3xl">VS</div>
          <div className="text-gray-700">→</div>
        </div>

        <div className="bg-purple-950/50 border border-purple-500/40 rounded-xl p-6 flex-1 glow-purple">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-purple-400 font-bold text-lg">🟣 A*</div>
            {astarWins ? (
              <span className="bg-green-500/20 border border-green-500/40 text-green-400 text-xs px-2 py-1 rounded-full">
                🏆 Winner
              </span>
            ) : null}
          </div>
          <div className="flex justify-between items-center py-2 border-b border-purple-900/50">
            <span className="text-gray-400 text-sm">Nodes Explored</span>
            <span className="text-white font-bold text-xl">
              {astarStats.nodesExplored}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-purple-900/50">
            <span className="text-gray-400 text-sm">Path Length</span>
            <span className="text-white font-bold text-xl">
              {astarStats.pathLength} cells
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-purple-900/50">
            <span className="text-gray-400 text-sm">Time Taken</span>
            <span className="text-white font-bold text-xl">
              {astarStats.timeMs}ms
            </span>
          </div>
          <div className="bg-purple-900 text-purple-300 text-xs px-3 py-1 rounded-full mt-4 inline-block">
            Heuristic Search
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-950/50 to-purple-950/50 border border-indigo-500/30 rounded-xl p-6 mb-6">
        {noPath ? (
          <div className="text-yellow-400 text-center text-lg">
            ⚠️ No path found — the maze blocked all routes from start to end.
            Click Generate Maze and try again.
          </div>
        ) : (
          <>
            <div
              className="font-black text-3xl text-center mb-3"
              style={{
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🏆 A* explored {pct}% fewer nodes than BFS!
            </div>
            <div className="text-gray-400 text-sm text-center max-w-2xl mx-auto">
              Both algorithms found the same optimal path of {bfsStats.pathLength} steps.
              BFS blindly explored {bfsStats.nodesExplored} nodes while A* intelligently
              reached the goal in just {astarStats.nodesExplored} nodes — saving
              {" "}{nodesDiff} unnecessary explorations.
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-5">
          <div className="text-blue-400 font-semibold text-sm mb-3">
            Why BFS explores more
          </div>
          <div className="text-gray-400 text-sm leading-relaxed">
            BFS spreads outward equally in all directions like water ripples.
            It has no idea where the goal is — it explores cells far from the
            goal just as eagerly as those near it. Despite the wasted effort,
            BFS guarantees the absolute shortest path every single time.
          </div>
        </div>
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-5">
          <div className="text-purple-400 font-semibold text-sm mb-3">
            Why A* is smarter
          </div>
          <div className="text-gray-400 text-sm leading-relaxed">
            A* uses Manhattan distance as a heuristic — at every step it
            scores each cell by distance-from-start PLUS estimated distance-
            to-goal. This guides the search toward the destination, skipping
            dead-end directions entirely. Same optimal result, far less work.
            This is the foundation of real-world AI pathfinding.
          </div>
        </div>
      </div>
    </section>
  );
}
