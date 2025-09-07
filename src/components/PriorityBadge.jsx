import React from "react";

export default function PriorityBadge({ label, color }) {
  if (!label) return null;
  const pillColor = {
    backgroundColor: color ? color + "20" : "rgba(0,0,0,0.06)",
    color: color || "#374151",
    padding: "6px 10px",
    borderRadius: 999,
    fontWeight: 600,
    fontSize: 13,
    display: "inline-block",
  };
  return <span style={pillColor}>{label}</span>;
}
