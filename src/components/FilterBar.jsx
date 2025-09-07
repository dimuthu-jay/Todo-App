import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function FilterBar() {
  const { filters, setFilters } = useTasks();
  const [localRange, setLocalRange] = useState({
    startDate: filters.startDate ? new Date(filters.startDate).toISOString().slice(0, 10) : "",
    endDate: filters.endDate ? new Date(filters.endDate).toISOString().slice(0, 10) : "",
  });

  const setMode = (mode) => setFilters({ mode });

  const applyRange = () => {
    const start = localRange.startDate ? new Date(localRange.startDate) : null;
    const end = localRange.endDate ? new Date(localRange.endDate) : null;
    setFilters({ mode: "RANGE", startDate: start, endDate: end });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div className="filter-bar">
        <button onClick={() => setMode("ALL")} aria-pressed={filters.mode === "ALL"}>All</button>
        <button onClick={() => setMode("TODAY")} aria-pressed={filters.mode === "TODAY"}>Today</button>
        <button onClick={() => setMode("WEEK")} aria-pressed={filters.mode === "WEEK"}>This Week</button>
        <button onClick={() => setMode("RANGE")} aria-pressed={filters.mode === "RANGE"}>Custom Range</button>
      </div>

      {filters.mode === "RANGE" && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <label>
            Start:
            <input type="date" value={localRange.startDate}
              onChange={(e) => setLocalRange(s => ({ ...s, startDate: e.target.value }))} />
          </label>
          <label>
            End:
            <input type="date" value={localRange.endDate}
              onChange={(e) => setLocalRange(s => ({ ...s, endDate: e.target.value }))} />
          </label>
          <button onClick={applyRange}>Apply</button>
        </div>
      )}
    </div>
  );
}
