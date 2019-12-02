const express = require("express");
const cartRoutes = express.Router();
const pool = require("./connection");
cartRoutes.get("/", (req, res) => {
  res.send("I'm here foo!");
});
const cartItems = [{ id: 1, product: "Borderlands 3", price: 60, quantity: 1 }];
let nextId = 2;
cartRoutes.get("/cart-items", (req, res) => {
  res.json(cartItems);
});
cartRoutes.get("/cart-items/:id", (req, res) => {
  let sql = "SELECT * FROM cart-items";
  pool.query(sql).then(result => {
    res.json(result.rows);
  });
  const id = parseInt(req.params.id);
  let thisItem = cartItems.find(anItem => anItem.id === id);
  if (thisItem) {
    res.json(thisItem);
  } else {
    res.status(404);
    res.send(`No Item with id ${id}`);
  }
});
cartRoutes.post("/cart-items", (req, res) => {
  const anItem = req.body;
  anItem.id = nextId;
  nextId++;
  cartItems.push(anItem);
  res.status(201);
  res.json(anItem);
});
cartRoutes.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  item.id = id;
  const index = cartItems.findIndex(i => i.id === id);
  cartItems.splice(index, 1, item);
  res.json(item);
});
cartRoutes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex(i => i.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  res.sendStatus(204);
});
module.exports = cartRoutes;
