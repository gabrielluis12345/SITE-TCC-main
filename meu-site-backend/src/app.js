import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
