export default function ControlPanel({
  onGenerate,
  onClear,
  onStart,
  onReset,
  speed,
  onSpeedChange,
  isRunning,
}) {
  return (
    <div className="bg-gray-900/80 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center gap-3 flex-wrap">
      <button
        type="button"
        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 border border-emerald-400/30 transition-all duration-200"
        onClick={onGenerate}
      >
        🗺️ Generate Maze
      </button>
      <button
        type="button"
        className="bg-gray-700 hover:bg-gray-600 border border-gray-600 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 text-white"
        onClick={onClear}
      >
        🧹 Clear Board
      </button>
      <button
        type="button"
        className={`bg-blue-600 hover:bg-blue-500 border border-blue-400/30 px-6 py-2.5 rounded-lg font-bold transition-all duration-200 text-white flex items-center gap-2 ${
          isRunning ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={onStart}
        disabled={isRunning}
      >
        {isRunning ? "⟳" : "▶"} {isRunning ? "Running..." : "Start"}
      </button>
      <button
        type="button"
        className={`bg-red-800 hover:bg-red-700 border border-red-600/30 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 text-white ${
          isRunning ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={onReset}
        disabled={isRunning}
      >
        ↺ Reset
      </button>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-gray-400 text-sm">⚡ Speed</span>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={speed}
          onChange={onSpeedChange}
          className="accent-blue-500"
        />
        <span className="text-blue-400 font-bold w-6 text-right">
          {speed}
        </span>
      </div>
    </div>
  );
}
