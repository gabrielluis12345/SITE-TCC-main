import express from "express";
import pool from "../db.js";

const router = express.Router();

// Criar carrinho para usuário (se não existir)
router.post("/create", async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
      [user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar carrinho" });
  }
});

// Adicionar item no carrinho
router.post("/add", async (req, res) => {
  const { cart_id, product_id, quantidade } = req.body;
  try {
    await pool.query(
      "INSERT INTO cart_items (cart_id, product_id, quantidade) VALUES ($1, $2, $3)",
      [cart_id, product_id, quantidade]
    );
    res.json({ message: "Item adicionado ao carrinho" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar item" });
  }
});

// Listar itens do carrinho
router.get("/:cart_id", async (req, res) => {
  const { cart_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT ci.id, p.nome, p.preco, ci.quantidade 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.cart_id = $1`,
      [cart_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar carrinho" });
  }
});

export default router;
