import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";
import FilterBar from "../components/FilterBar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function Home() {
  const { filteredTasks, updateTask, deleteTask } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (task) => {
    if (window.confirm(`Delete "${task.title}"?`)) deleteTask(task.id);
  };

  return (
    <main>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Tasks</h1>
          <div style={{ color: "var(--text-muted)", marginTop: 4 }}>
            {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="secondary" onClick={() => { setShowForm(true); setEditingTask(null); }}>+ Add Task</button>
          <button onClick={toggleTheme} className="secondary">{theme === "light" ? "🌙 Dark" : "☀️ Light"}</button>
        </div>
      </header>

      {showForm && (
        <TaskForm
          existingTask={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      <FilterBar />

      <section style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginTop: 16,
      }}>
        {filteredTasks.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No tasks to show.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => updateTask(task.id, { completed: !task.completed })}
              onEdit={handleEdit}
              onDelete={() => handleDelete(task)}
            />
          ))
        )}
      </section>
    </main>
  );
}
