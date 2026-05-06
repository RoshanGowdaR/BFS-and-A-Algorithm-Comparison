import { useRef, useState } from "react";
import { generateMaze } from "../utils/mazeGenerator.js";
import {
  cloneGrid,
  createEmptyGrid,
  getDelay,
  sleep,
} from "../utils/gridHelpers.js";
import { runBFS } from "../utils/bfs.js";
import { runAstar } from "../utils/astar.js";

export default function useVisualizer() {
  const [masterGrid, setMasterGrid] = useState(() => generateMaze());
  const [bfsGrid, setBfsGrid] = useState(() => cloneGrid(masterGrid));
  const [astarGrid, setAstarGrid] = useState(() => cloneGrid(masterGrid));
  const [startCell, setStartCell] = useState({ row: 0, col: 0 });
  const [endCell, setEndCell] = useState({ row: 19, col: 19 });
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [showResults, setShowResults] = useState(false);
  const [bfsStats, setBfsStats] = useState({
    nodesExplored: 0,
    pathLength: 0,
    timeMs: 0,
  });
  const [astarStats, setAstarStats] = useState({
    nodesExplored: 0,
    pathLength: 0,
    timeMs: 0,
  });
  const isMouseDown = useRef(false);
  const clickMode = useRef("wall");

  const handleGenerate = () => {
    const newGrid = generateMaze();
    setMasterGrid(newGrid);
    setBfsGrid(cloneGrid(newGrid));
    setAstarGrid(cloneGrid(newGrid));
    setStartCell({ row: 0, col: 0 });
    setEndCell({ row: 19, col: 19 });
    setBfsStats({ nodesExplored: 0, pathLength: 0, timeMs: 0 });
    setAstarStats({ nodesExplored: 0, pathLength: 0, timeMs: 0 });
    setShowResults(false);
  };

  const handleClear = () => {
    const newGrid = createEmptyGrid();
    newGrid[0][0].state = "start";
    newGrid[19][19].state = "end";
    setMasterGrid(newGrid);
    setBfsGrid(cloneGrid(newGrid));
    setAstarGrid(cloneGrid(newGrid));
    setStartCell({ row: 0, col: 0 });
    setEndCell({ row: 19, col: 19 });
    setBfsStats({ nodesExplored: 0, pathLength: 0, timeMs: 0 });
    setAstarStats({ nodesExplored: 0, pathLength: 0, timeMs: 0 });
    clickMode.current = "wall";
    setShowResults(false);
  };

  const handleCellInteraction = (row, col) => {
    if (isRunning) {
      return;
    }

    if (startCell == null) {
      const updatedGrid = cloneGrid(masterGrid);
      updatedGrid[row][col].state = "start";
      setStartCell({ row, col });
      setMasterGrid(updatedGrid);
      setBfsGrid(cloneGrid(updatedGrid));
      setAstarGrid(cloneGrid(updatedGrid));
      return;
    }

    if (endCell == null) {
      const updatedGrid = cloneGrid(masterGrid);
      updatedGrid[row][col].state = "end";
      setEndCell({ row, col });
      setMasterGrid(updatedGrid);
      setBfsGrid(cloneGrid(updatedGrid));
      setAstarGrid(cloneGrid(updatedGrid));
      return;
    }

    if (
      (row === startCell.row && col === startCell.col) ||
      (row === endCell.row && col === endCell.col)
    ) {
      return;
    }

    setMasterGrid((prev) => {
      const next = cloneGrid(prev);
      const target = next[row][col];
      target.state = target.state === "wall" ? "empty" : "wall";
      setBfsGrid(cloneGrid(next));
      setAstarGrid(cloneGrid(next));
      return next;
    });
  };

  const handleStart = async () => {
    if (!startCell || !endCell || isRunning) {
      return;
    }

    setIsRunning(true);
    setShowResults(false);
    setBfsGrid(cloneGrid(masterGrid));
    setAstarGrid(cloneGrid(masterGrid));
    setBfsStats({ nodesExplored: 0, pathLength: 0, timeMs: 0 });
    setAstarStats({ nodesExplored: 0, pathLength: 0, timeMs: 0 });

    const onVisitBFS = async (row, col) => {
      setBfsGrid((prev) => {
        const next = cloneGrid(prev);
        next[row][col].state = "visited";
        return next;
      });
      await sleep(getDelay(speed));
    };

    const onPathBFS = async (pathArray) => {
      for (const cell of pathArray) {
        setBfsGrid((prev) => {
          const next = cloneGrid(prev);
          next[cell.row][cell.col].state = "path";
          return next;
        });
        await sleep(getDelay(speed) * 1.5);
      }
    };

    const onVisitAstar = async (row, col) => {
      setAstarGrid((prev) => {
        const next = cloneGrid(prev);
        next[row][col].state = "visited";
        return next;
      });
      await sleep(getDelay(speed));
    };

    const onPathAstar = async (pathArray) => {
      for (const cell of pathArray) {
        setAstarGrid((prev) => {
          const next = cloneGrid(prev);
          next[cell.row][cell.col].state = "path";
          return next;
        });
        await sleep(getDelay(speed) * 1.5);
      }
    };

    try {
      await Promise.all([
        runBFS(
          cloneGrid(masterGrid),
          startCell,
          endCell,
          onVisitBFS,
          onPathBFS,
          setBfsStats,
          speed
        ),
        runAstar(
          cloneGrid(masterGrid),
          startCell,
          endCell,
          onVisitAstar,
          onPathAstar,
          setAstarStats,
          speed
        ),
      ]);
      setShowResults(true);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setBfsGrid(cloneGrid(masterGrid));
    setAstarGrid(cloneGrid(masterGrid));
    setBfsStats({ nodesExplored: 0, pathLength: 0, timeMs: 0 });
    setAstarStats({ nodesExplored: 0, pathLength: 0, timeMs: 0 });
    setIsRunning(false);
    setShowResults(false);
  };

  const handleMouseDown = (row, col) => {
    isMouseDown.current = true;
    handleCellInteraction(row, col);
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleCellEnter = (row, col) => {
    if (!isMouseDown.current) {
      return;
    }
    handleCellInteraction(row, col);
  };

  const handleCellClick = (row, col) => {
    handleCellInteraction(row, col);
  };

  const handleSpeedChange = (event) => {
    setSpeed(Number(event.target.value));
  };

  return {
    masterGrid,
    bfsGrid,
    astarGrid,
    startCell,
    endCell,
    isRunning,
    speed,
    bfsStats,
    astarStats,
    showResults,
    handleGenerate,
    handleClear,
    handleStart,
    handleReset,
    handleSpeedChange,
    handleCellClick,
    handleCellEnter,
    handleMouseDown,
    handleMouseUp,
  };
}
