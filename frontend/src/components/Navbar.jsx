// ==========================
// src/components/Navbar.jsx
// ==========================
import React from "react";


export default function Navbar({ onNavigate }) {
return (
<nav className="navbar">
<h2 className="logo">Bet do Término</h2>
<ul>
<li onClick={() => onNavigate("dashboard")}>Dashboard</li>
<li onClick={() => onNavigate("login")}>Sair</li>
</ul>
</nav>
);
}