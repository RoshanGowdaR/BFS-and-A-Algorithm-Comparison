export default function Cell({
  cell,
  panelColor,
  isRunning,
  onClick,
  onMouseEnter,
  onMouseDown,
}) {
  const baseClasses =
    "w-[22px] h-[22px] rounded-sm transition-all duration-150";
  const hoverClass = isRunning ? "" : "cursor-pointer hover:opacity-80";

  const styles = {
    empty: { backgroundColor: "#1f2937" },
    wall: { backgroundColor: "#e5e7eb" },
    start: { backgroundColor: "#22c55e", boxShadow: "0 0 8px #22c55e" },
    end: { backgroundColor: "#ef4444", boxShadow: "0 0 8px #ef4444" },
    path: { backgroundColor: "#f59e0b", boxShadow: "0 0 6px #f59e0b80" },
    visited: {
      backgroundColor: panelColor === "purple" ? "#a855f7" : "#3b82f6",
    },
  };

  const isVisited = cell.state === "visited";
  const isPath = cell.state === "path";
  const animationClass = isVisited
    ? "cell-visited"
    : isPath
    ? "cell-path"
    : "";

  return (
    <div
      role="button"
      tabIndex={0}
      className={`${baseClasses} ${hoverClass} ${animationClass}`}
      style={styles[cell.state] || styles.empty}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClick();
        }
      }}
    />
  );
}
