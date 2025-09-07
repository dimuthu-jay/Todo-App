import React from "react";

export default function Footer() {
  return (
    <footer style={{
      marginTop: 32,
      padding: "16px 0",
      textAlign: "center",
      color: "var(--text-muted)",
      fontSize: 14,
      borderTop: "1px solid var(--border-color, #eee)",
      background: "var(--input-bg, #fff)"
    }}>
      © 2025 Dimuthu Jayathunga
    </footer>
  );
}