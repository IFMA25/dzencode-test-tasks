import { Router } from "express";

import { orders, products } from "../data/index.data.js";

const router = Router();

router.get("/orders", (req, res) => {
  const result = orders.map((order) => ({
    ...order,
    products: products.filter((product) => product.order === order.id),
  }));

  res.json(result);
});

router.get("/products", (req, res) => {
  const result = products.map((product) => ({
    ...product,
    orderTitle: orders.find((order) => order.id === product.order)?.title ?? "",
  }));

  res.json(result);
});

router.delete("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = orders.findIndex((order) => order.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  orders.splice(index, 1);
  res.status(204).send();
});

export default router;
