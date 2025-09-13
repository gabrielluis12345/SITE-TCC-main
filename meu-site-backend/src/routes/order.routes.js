import express from "express";
import pool from "../db.js";

const router = express.Router();

// Finalizar pedido (checkout)
router.post("/checkout", async (req, res) => {
  const { user_id, cart_id } = req.body;
  try {
    // Buscar itens do carrinho
    const items = await pool.query(
      `SELECT ci.product_id, ci.quantidade, p.preco
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.cart_id = $1`,
      [cart_id]
    );

    if (items.rows.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }

    // Calcular total
    const total = items.rows.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    // Criar pedido
    const order = await pool.query(
      "INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *",
      [user_id, total, "PENDENTE"]
    );

    // Limpar carrinho após checkout
    await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cart_id]);

    res.json({ message: "Pedido realizado com sucesso!", order: order.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Erro no checkout" });
  }
});

export default router;
