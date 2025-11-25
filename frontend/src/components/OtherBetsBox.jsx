// src/components/OtherBetsBox.jsx
import React, { useState } from "react";
import "../styles/Dashboard.css";

export default function OtherBetsBox({ categories = [], onPick = () => {} }) {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (cat) => {
    setOpenCategory(prev => prev === cat ? null : cat);
  };

  return (
    <div className="other-bets-container">
      {categories.map(cat => (
        <div key={cat.category} className="other-category-block">
          <div
            className="other-category-header"
            onClick={() => toggleCategory(cat.category)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") toggleCategory(cat.category); }}
          >
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <span className="cat-emoji">🔹</span>
              <span>{cat.category}</span>
            </div>
            <div style={{color:"var(--muted)", fontWeight:800}}>
              {openCategory === cat.category ? "▲" : "▼"}
            </div>
          </div>

          <div className={`other-bets-list ${openCategory === cat.category ? "open" : ""}`}>
            {cat.items.map(it => (
              <div key={it.id} className="other-bet-item" onClick={() => onPick(it, cat)}>
                <div className="label">{it.label}</div>
                <div className="odds">{it.odds.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
