// backend/src/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

// ====================== REGISTRO ======================
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "E-mail já está sendo usado." });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Nome de usuário já existe." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
      balance: 100.0, // saldo inicial
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({
      message: "Usuário registrado com sucesso!",
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email, balance: newUser.balance },
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// ====================== LOGIN ======================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// ====================== GET USER ======================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.json({ user });
  } catch {
    res.status(500).json({ message: "Erro ao carregar usuário" });
  }
};
