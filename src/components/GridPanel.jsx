import Cell from "./Cell.jsx";
import StatsBar from "./StatsBar.jsx";

const COLOR_CLASSES = {
  blue: {
    title: "text-blue-400",
    border: "border-blue-500/30",
    glow: "panel-glow-blue",
    explored: "text-blue-400",
  },
  purple: {
    title: "text-purple-400",
    border: "border-purple-500/30",
    glow: "panel-glow-purple",
    explored: "text-purple-400",
  },
};

export default function GridPanel({
  title,
  subtitle,
  color,
  grid,
  stats,
  onCellClick,
  onCellEnter,
  onMouseDown,
  onMouseUp,
  isRunning,
}) {
  const colors = COLOR_CLASSES[color] || COLOR_CLASSES.blue;

  return (
    <section
      className={`w-1/2 flex flex-col bg-gray-900 border rounded-xl p-5 gap-3 ${
        colors.border
      } ${colors.glow}`}
    >
      <div>
        <h2 className={`${colors.title} font-bold text-lg`}>{title}</h2>
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">
          {subtitle}
        </p>
      </div>
      <div
        className="grid grid-cols-20 gap-[2px] bg-black/40 rounded-lg p-3 border border-gray-800"
        onMouseUp={onMouseUp}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              panelColor={color}
              isRunning={isRunning}
              onClick={() => onCellClick(rowIndex, colIndex)}
              onMouseEnter={() => onCellEnter(rowIndex, colIndex)}
              onMouseDown={() => onMouseDown(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <div className="text-xs text-gray-600 flex gap-3 mt-2 flex-wrap">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-green-500" /> Start
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-red-500" /> End
        </span>
        <span className={`flex items-center gap-1 ${colors.explored}`}>
          <span
            className="inline-block w-3 h-3"
            style={{
              backgroundColor: color === "purple" ? "#a855f7" : "#3b82f6",
            }}
          />
          Explored
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-yellow-400" /> Path
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-gray-200" /> Wall
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-gray-700" /> Empty
        </span>
      </div>
      <StatsBar stats={stats} color={color} />
    </section>
  );
}
