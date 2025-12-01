// src/components/Navbar.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiStar, FiUser } from "react-icons/fi";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="navbar">
      <Link
        to="/"
        className={current === "/" ? "nav-item active" : "nav-item"}
      >
        <FiHome size={22} />
        <span>Início</span>
      </Link>

      <Link
        to="/apostas"
        className={current.includes("/apostas") ? "nav-item active" : "nav-item"}
      >
        <FiStar size={22} />
        <span>Apostas</span>
      </Link>

      <Link
        to="/conta"
        className={current === "/conta" ? "nav-item active" : "nav-item"}
      >
        <FiUser size={22} />
        <span>Conta</span>
      </Link>
    </div>
  );
}
