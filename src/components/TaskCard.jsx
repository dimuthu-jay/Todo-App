import React from "react";
import PriorityBadge from "./PriorityBadge";

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const { title, description, dueDate, completed, priority } = task;
  return (
    <article className={`task-card ${completed ? "completed" : ""}`}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div>
            <h3 style={{ margin: 0 }}>{title}</h3>
            {description && <p style={{ marginTop: 6 }}>{description}</p>}
            {dueDate && <small style={{ display: "block", marginTop: 8 }}>Due: {new Date(dueDate).toLocaleDateString()}</small>}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <PriorityBadge label={priority?.label} color={priority?.color} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onToggle?.(task)} className="secondary">
              {completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => onEdit?.(task)}>Edit</button>
            <button onClick={() => onDelete?.(task)} className="secondary">Delete</button>
          </div>
        </div>
      </header>
    </article>
  );
}
