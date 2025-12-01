// src/components/Toast.jsx

import React, { useEffect, useState } from "react";
import "../styles/toast.css";

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    function handler(e) {
      setToast(e.detail);

      setTimeout(() => {
        setToast(null);
      }, 3000);
    }

    window.addEventListener("toast", handler);
    return () => window.removeEventListener("toast", handler);
  }, []);

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.message}
    </div>
  );
}
