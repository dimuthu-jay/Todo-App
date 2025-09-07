import React from "react";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Main content */}
          <div style={{ flex: 1 }}>
            <Home />
          </div>
          <Footer />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}
