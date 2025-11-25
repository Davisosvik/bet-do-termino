// src/utils/apiMock.js

// salva histórico no localStorage
export function addHistory(entry) {
  const db = JSON.parse(localStorage.getItem("history") || "[]");
  db.push(entry);
  localStorage.setItem("history", JSON.stringify(db));
}

// retorna histórico
export function getHistory() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const db = JSON.parse(localStorage.getItem("history") || "[]");
      resolve(db.reverse());
    }, 400);
  });
}

// resultados simulados
export function getResultados() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "João & Maria — Quem termina: Parceiro A", result: "Ganhou" },
        { id: 2, title: "Pedro & Sofia — Duração: Longo prazo", result: "Perdeu" }
      ]);
    }, 500);
  });
}
