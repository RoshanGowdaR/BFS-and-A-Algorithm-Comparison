# AI Search Visualizer (Multi-Algorithm)

An interactive visualizer that compares up to 3 search algorithms on the same maze. It highlights explored nodes, the final path, and a comparison summary to show efficiency differences.

![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwindcss&logoColor=white)

## Features
- Compare up to 3 algorithms at once
- Algorithm selector dropdowns with duplicate prevention
- User-defined start/end selection before maze generation
- Random maze generation with guaranteed path between chosen endpoints
- Animated exploration and path rendering
- Results summary with explored nodes, path length, and time

## Demo
Add a short screen recording or GIF here after deployment.

## Screenshots
Add screenshots of the BFS vs A* comparison view and the results panel.

## Tech Stack
- React 18
- Vite
- Tailwind CSS

## How It Works
- **BFS** explores the grid level by level with no heuristic, guaranteeing the shortest path.
- **A*** uses Manhattan distance as a heuristic to guide the search and typically explores fewer nodes.
- **DFS** explores depth-first and may not find the shortest path.
- **Greedy Best-First** prioritizes nodes closest to the goal (heuristic only).
- **Uniform-Cost** expands by path cost (optimal with unit weights).
- **DLS / IDDFS** explore with depth limits (IDDFS is complete but slower).
- **Bidirectional** searches from start and end simultaneously.
- **Memory-Bounded** limits open-set size for a bounded heuristic search.
- **Hill-Climbing** can get stuck in local maxima.

## Key Highlights
- The grid shows explored nodes and the final path simultaneously for clearer comparisons.
- The results panel summarizes explored nodes, path length, and time taken.
- Winner is based on fewest explored nodes (tie-breaker: time, then path length).
- Maze generation guarantees a path between your chosen start and end cells.

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
- **Generate Maze:** If no start/end selected, prompts you to pick them. Then generates a maze.
- **Clear Board:** Resets the grid to empty (no start/end).
- **Start:** Runs the selected algorithms side by side.
- **Reset:** Clears exploration results but keeps the maze.
- **Compare:** Choose 1–3 algorithms to compare.
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
   ├── astar.js
   ├── dfs.js
   ├── greedyBestFirst.js
   ├── uniformCost.js
   ├── depthLimited.js
   ├── iterativeDeepening.js
   ├── bidirectional.js
   ├── memoryBounded.js
   └── hillClimbing.js
```

## Notes
- Some algorithms (DFS, Greedy, Hill-Climbing) do not guarantee the shortest path.
- Results remain visible after the run so you can inspect explored areas.

## Troubleshooting
- If the page does not update after changes, hard refresh (Ctrl+Shift+R).
- If Vercel shows a blank page, confirm the output directory is `dist`.

## License
This project is for educational use.
