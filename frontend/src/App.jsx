// src/App.jsx
import "./styles/global.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Bets from "./pages/Bets";
import BetDetails from "./pages/BetDetails";
import Conta from "./pages/Conta";
import Deposito from "./pages/Deposito";

import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Header from "./components/Header";
import Toast from "./components/Toast";
import BetSlipSidebar from "./components/BetSlipSidebar";

// ============================
// PROTECTED ROUTE
// ============================
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

// ============================
// APP CONTENT — usa useLocation
// ============================
function AppContent() {
  const location = useLocation();
  const hiddenNavbarRoutes = ["/login", "/register"];

  const hideNavigation = hiddenNavbarRoutes.includes(location.pathname.toLowerCase());

  // 🔵 ESTADO GLOBAL DO SLIP
  const [slip, setSlip] = useState([]);

  return (
    <>
      <Toast />

      {!hideNavigation && (
        <>
          <Header />
          <Navbar />
        </>
      )}

      <main style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard slip={slip} setSlip={setSlip} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/apostas"
            element={
              <ProtectedRoute>
                <Bets slip={slip} setSlip={setSlip} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/apostas/:id"
            element={
              <ProtectedRoute>
                <BetDetails slip={slip} setSlip={setSlip} />
              </ProtectedRoute>
            }
          />

          <Route path="/conta" element={<ProtectedRoute><Conta/></ProtectedRoute>} />
          <Route path="/deposito" element={<ProtectedRoute><Deposito/></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideNavigation && <MobileNav />}

      {/* 🔵 SLIP GLOBAL FIXO */}
      <BetSlipSidebar slip={slip} setSlip={setSlip} />
    </>
  );
}


// ============================
// APP PRINCIPAL
// ============================
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
