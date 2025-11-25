// src/App.jsx
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Toast from "./components/Toast";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [toast, setToast] = useState(null);

  // função global de notificação
  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  function loginUser(data) {
    setUser(data);
    showToast("success", "Login bem-sucedido! 🎉");
    setPage("dashboard");
  }

  function registerUser(data) {
    setUser(data);
    showToast("success", "Conta criada! Bem-vindo 😄");
    setPage("dashboard");
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    showToast("info", "Você saiu da conta.");
    setPage("login");
  }

  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} />}

      {page === "login" && <Login onNavigate={setPage} onLogin={loginUser} toast={showToast} />}
      {page === "register" && <Register onNavigate={setPage} onRegister={registerUser} toast={showToast} />}
      {page === "dashboard" && user && (
        <Dashboard
          user={user}
          onNavigate={setPage}
          logout={logout}
          setUser={setUser}
          toast={showToast}
        />
      )}
    </>
  );
}
