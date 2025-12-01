// frontend/src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",  // ✔ CORRIGIDO
  timeout: 10000,
});

export default api;
