// src/components/CouplesSelector.jsx
import React from "react";

export default function CouplesSelector({ couples = [], value, onChange }) {
  return (
    <div className="couples-select">
      <select value={value} onChange={e => onChange(e.target.value)}>
        {couples.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
      </select>
    </div>
  );
}
