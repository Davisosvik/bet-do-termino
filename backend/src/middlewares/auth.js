import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ success:false, message: "Sem token" });

  const parts = auth.split(" ");
  if (parts.length !== 2) return res.status(401).json({ success:false, message: "Token inválido" });

  const token = parts[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
    next();
  } catch (err) {
    return res.status(401).json({ success:false, message: "Token inválido ou expirado" });
  }
};
