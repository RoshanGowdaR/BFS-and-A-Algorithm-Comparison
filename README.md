# AI Search Visualizer (BFS vs A*)

An interactive, side-by-side visualizer that compares Breadth-First Search (BFS) and A* on the same maze. It highlights explored nodes, the final shortest path, and a comparison summary to show how the heuristic improves efficiency.

## Features
- Side-by-side BFS and A* visualization
- Interactive maze grid (draw walls by click/drag)
- Random maze generation with guaranteed paths
- Animated exploration and path rendering
- Results summary with explored nodes, path length, and time

## Tech Stack
- React 18
- Vite
- Tailwind CSS

## How It Works
- **BFS** explores the grid level by level with no heuristic, guaranteeing the shortest path.
- **A*** uses Manhattan distance as a heuristic to guide the search and typically explores fewer nodes.
- Both algorithms run on identical mazes for a fair comparison.

## Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Build for Production
```bash
npm run build
```

## Deployment (Vercel)
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

## Controls
- **Generate Maze:** Creates a new randomized maze.
- **Clear Board:** Resets the grid to empty.
- **Start:** Runs BFS and A* side by side.
- **Reset:** Clears exploration results but keeps the maze.
- **Speed:** Adjusts animation speed.

## Project Structure
```
src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── Header.jsx
│   ├── ControlPanel.jsx
│   ├── GridPanel.jsx
│   ├── Cell.jsx
│   ├── StatsBar.jsx
│   └── ResultsPanel.jsx
├── hooks/
│   └── useVisualizer.js
└── utils/
    ├── mazeGenerator.js
    ├── gridHelpers.js
    ├── bfs.js
    └── astar.js
```

## Notes
- The maze generator guarantees at least one valid path and multiple routes.
- Results remain visible after the run so you can inspect explored areas.

## License
This project is for educational use.
