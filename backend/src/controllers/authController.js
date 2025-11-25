// backend/src/controllers/authController.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ====================== REGISTRO ======================
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validação simples
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    // Verifica se o e-mail já existe
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "E-mail já está sendo usado." });
    }

    // Verifica se o username já existe
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Nome de usuário já existe." });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Criar novo usuário
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    // Tentar salvar no banco (tratando erro 11000)
    try {
      await newUser.save();
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ message: "Nome de usuário já existe." });
      }
      console.error("Erro ao salvar usuário:", err);
      return res
        .status(500)
        .json({ message: "Erro interno ao registrar usuário." });
    }

    return res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// ====================== LOGIN ======================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação simples
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    // Verificar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    // Validar senha
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    // Criar token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};
