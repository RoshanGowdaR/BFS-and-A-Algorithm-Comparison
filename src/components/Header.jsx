export default function Header() {
  return (
    <header className="bg-gradient-to-b from-[#0a0a0f] to-[#111827] border-b border-gray-800 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl mr-3">🧠</span>
        <div>
          <div
            className="font-bold text-2xl"
            style={{
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Search Visualizer
          </div>
          <div className="text-gray-500 text-xs tracking-widest uppercase">
            BFS vs A* — Side by Side Comparison
          </div>
        </div>
      </div>
      <div className="bg-gray-800 border border-gray-700 text-gray-300 text-xs px-4 py-2 rounded-full tracking-wide">
        23CS662 — Artificial Intelligence
      </div>
    </header>
  );
}
