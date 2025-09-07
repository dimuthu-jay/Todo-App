import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { isToday, isThisWeek, isWithinRange } from "../utils/dateUtils";

const TaskContext = createContext();

const initialState = {
  tasks: [
    // sample seed tasks (optional) — comment out or remove if undesired
    // {
    //   id: "t1",
    //   title: "Prepare report",
    //   description: "Finalize the quarterly report",
    //   dueDate: new Date().toISOString().slice(0, 10),
    //   completed: false,
    //   priority: { label: "High", color: "#f59e42" },
    // },
    // {
    //   id: "t2",
    //   title: "Team meeting",
    //   description: "Discuss project status",
    //   dueDate: new Date().toISOString().slice(0, 10),
    //   completed: false,
    //   priority: { label: "Medium", color: "#993bf6" },
    // },
  ],
  filters: { mode: "ALL", startDate: null, endDate: null },
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload ?? state;
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK": {
      const { id, updates } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      };
    }
    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("ae_todo_state_v1");
    if (saved) dispatch({ type: "INIT", payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem("ae_todo_state_v1", JSON.stringify(state));
  }, [state]);

  const filteredTasks = useMemo(() => {
    const { tasks, filters } = state;
    switch (filters.mode) {
      case "TODAY":
        return tasks.filter((t) => t.dueDate && isToday(new Date(t.dueDate)));
      case "WEEK":
        return tasks.filter((t) => t.dueDate && isThisWeek(new Date(t.dueDate)));
      case "RANGE":
        return tasks.filter(
          (t) => t.dueDate && isWithinRange(new Date(t.dueDate), filters.startDate, filters.endDate)
        );
      default:
        return tasks;
    }
  }, [state]);

  const value = {
    tasks: state.tasks,
    filters: state.filters,
    filteredTasks,
    addTask: (task) => dispatch({ type: "ADD_TASK", payload: task }),
    updateTask: (id, updates) => dispatch({ type: "UPDATE_TASK", payload: { id, updates } }),
    deleteTask: (id) => dispatch({ type: "DELETE_TASK", payload: id }),
    setFilters: (updates) => dispatch({ type: "SET_FILTERS", payload: updates }),
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTasks = () => useContext(TaskContext);
