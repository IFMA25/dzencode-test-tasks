import { Router } from "express";

import { orders, products } from "../data/index.data.js";

const router = Router();

router.get("/orders", (req, res) => {
  const { search } = req.query;

  const result = orders
    .filter((order) => !search || order.title.toLowerCase().includes(search.toLowerCase()))
    .map((order) => ({
      ...order,
      products: products.filter((product) => product.order === order.id),
    }));

  res.json(result);
});

router.get("/products", (req, res) => {
  const { type, order, search } = req.query;

  const result = products
    .filter((product) => !type || product.type === type)
    .filter((product) => !order || product.order === Number(order))
    .filter((product) => !search || product.title.toLowerCase().includes(search.toLowerCase()))
    .map((product) => ({
      ...product,
      orderTitle: orders.find((o) => o.id === product.order)?.title ?? "",
    }));

  res.json(result);
});

router.get("/products/types", (req, res) => {
  const types = [...new Set(products.map((product) => product.type))];

  res.json(types);
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
