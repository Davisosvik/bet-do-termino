import React from "react";
import "./Header.css";

export default function Header() {
  const name = "BET DO TERMINO 💔";

  return (
    <header className="header">
      <div className="header-left">
        <h1>{name}</h1>
      </div>

      <div className="header-right">
        <span className="balance">
          R$ {localStorage.getItem("balance") || "0,00"}
        </span>
      </div>
    </header>
  );
}
