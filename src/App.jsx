import Header from "./components/Header.jsx";
import ControlPanel from "./components/ControlPanel.jsx";
import GridPanel from "./components/GridPanel.jsx";
import ResultsPanel from "./components/ResultsPanel.jsx";
import useVisualizer from "./hooks/useVisualizer.js";

export default function App() {
  const {
    bfsGrid,
    astarGrid,
    bfsStats,
    astarStats,
    showResults,
    isRunning,
    speed,
    handleGenerate,
    handleClear,
    handleStart,
    handleReset,
    handleSpeedChange,
    handleCellClick,
    handleCellEnter,
    handleMouseDown,
    handleMouseUp,
  } = useVisualizer();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <ControlPanel
        onGenerate={handleGenerate}
        onClear={handleClear}
        onStart={handleStart}
        onReset={handleReset}
        speed={speed}
        onSpeedChange={handleSpeedChange}
        isRunning={isRunning}
      />
      <main className="flex flex-1 gap-4 p-4">
        <GridPanel
          title="BFS"
          subtitle="Breadth First Search"
          color="blue"
          grid={bfsGrid}
          stats={bfsStats}
          onCellClick={handleCellClick}
          onCellEnter={handleCellEnter}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          isRunning={isRunning}
        />
        <GridPanel
          title="A*"
          subtitle="A Star Search"
          color="purple"
          grid={astarGrid}
          stats={astarStats}
          onCellClick={handleCellClick}
          onCellEnter={handleCellEnter}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          isRunning={isRunning}
        />
      </main>
      <ResultsPanel
        bfsStats={bfsStats}
        astarStats={astarStats}
        show={showResults}
      />
    </div>
  );
}
