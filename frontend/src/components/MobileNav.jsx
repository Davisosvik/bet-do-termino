import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MobileNav.css";

export default function MobileNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="mobile-nav">
      <Link to="/" className={isActive("/") ? "active" : ""}>
        <span className="icon">🏠</span>
        <p>Início</p>
      </Link>

      <Link to="/apostas" className={isActive("/apostas") ? "active" : ""}>
        <span className="icon">🎲</span>
        <p>Apostas</p>
      </Link>

      <Link to="/conta" className={isActive("/conta") ? "active" : ""}>
        <span className="icon">👤</span>
        <p>Conta</p>
      </Link>
    </nav>
  );
}
