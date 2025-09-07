import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

const PRIORITIES = [
  { label: "Critical", color: "#e11d48" },
  { label: "High", color: "#f59e42" },
  { label: "Medium", color: "#993bf6" }, 
];

export default function TaskForm({ onClose, existingTask }) {
  const { addTask, updateTask } = useTasks();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: PRIORITIES[2], // Use PRIORITIES[2] for "Medium"
  });
  const [priority, setPriority] = useState(existingTask?.priority || PRIORITIES[2]);

  useEffect(() => {
    if (existingTask) {
      setForm({
        title: existingTask.title || "",
        description: existingTask.description || "",
        dueDate: existingTask.dueDate || "",
        priority: existingTask.priority || PRIORITIES[2],
      });
      setPriority(existingTask.priority || PRIORITIES[2]);
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const taskData = {
      title: form.title,
      description: form.description,
      dueDate: form.dueDate,
      completed: false,
      priority,
    };
    if (existingTask) {
      updateTask(existingTask.id, { ...form, priority });
    } else {
      addTask({
        id: crypto.randomUUID(),
        ...taskData,
      });
    }
    onClose?.();
    setForm({ title: "", description: "", dueDate: "", priority: PRIORITIES[2] });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{existingTask ? "Edit Task" : "New Task"}</h3>

      <label>
        Title
        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      </label>

      <label>
        Description
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </label>

      <label>
        Due date
        <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
      </label>

      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        Priority
        <select
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid var(--border-color, #ccc)",
            background: "var(--input-bg, #fff)",
            color: "var(--text-color, #222)",
            marginTop: "4px",
            width: "100%",
            boxSizing: "border-box"
          }}
          value={priority.label}
          onChange={e => {
            const selected = PRIORITIES.find(p => p.label === e.target.value);
            setPriority(selected);
          }}
        >
          {PRIORITIES.map(p => (
            <option key={p.label} value={p.label}>{p.label}</option>
          ))}
        </select>
      </label>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">{existingTask ? "Save" : "Add Task"}</button>
        <button type="button" className="secondary" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
