export default function StatsBar({ stats, color }) {
  const iconColor = color === "purple" ? "text-purple-400" : "text-blue-400";

  return (
    <div className="flex gap-3 mt-3 flex-wrap">
      <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 flex items-center gap-2">
        <span className={iconColor}>🔍</span>
        <span className="text-gray-500 text-xs">Nodes</span>
        <span className="text-white font-bold text-sm">
          {stats.nodesExplored}
        </span>
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 flex items-center gap-2">
        <span className={iconColor}>📏</span>
        <span className="text-gray-500 text-xs">Path</span>
        <span className="text-white font-bold text-sm">
          {stats.pathLength} cells
        </span>
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 flex items-center gap-2">
        <span className={iconColor}>⏱</span>
        <span className="text-gray-500 text-xs">Time</span>
        <span className="text-white font-bold text-sm">
          {stats.timeMs}ms
        </span>
      </div>
    </div>
  );
}
