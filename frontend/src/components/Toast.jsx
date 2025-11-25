// src/components/Toast.jsx
import React, { useEffect } from "react";
import "../styles/toast.css";

export default function Toast({ id, type = "info", message, duration = 3500, onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(t);
  }, [id, duration, onClose]);

  return (
    <div className={`toast ${type}`}>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={() => onClose(id)}>×</button>
    </div>
  );
}
