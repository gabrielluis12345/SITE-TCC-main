import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();
const JWT_SECRET = "minha_chave_supersecreta"; // depois troca por env

// Cadastro
router.post("/register", async (req, res) => {
    const { nome, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    try {
        const result = await pool.query(
            "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, email",
            [nome, email, hashedPassword]
        );
        res.json({ user: result.rows[0] });
    } catch (err) {
        res.status(400).json({ error: "Erro ao cadastrar usuário" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) return res.status(400).json({ error: "Usuário não encontrado" });

        const user = result.rows[0];
        const validPass = await bcrypt.compare(senha, user.senha);
        if (!validPass) return res.status(400).json({ error: "Senha inválida" });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Erro no login" });
    }
});

export default router;
