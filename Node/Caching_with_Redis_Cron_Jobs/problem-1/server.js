const express = require("express");
const Redis = require("ioredis");
const { items } = require("./data/db");

const redis = new Redis(); 
const app = express();
app.use(express.json());

const CACHE_KEY = "items:all";
const TTL = 60; 

app.get("/items", async (req, res) => {
  const cached = await redis.get(CACHE_KEY);
  if (cached) {
    console.log("Cache Hit");
    return res.status(200).json(JSON.parse(cached));
  }

  console.log("Cache Miss");
  await redis.set(CACHE_KEY, JSON.stringify(items), "EX", TTL);
  return res.status(200).json(items);
});

app.post("/items", async (req, res) => {
  const newItem = {
    id: Date.now().toString(),
    name: req.body.name
  };
  items.push(newItem);
  await redis.del(CACHE_KEY);
  res.status(201).json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ msg: "Item not found" });
  item.name = req.body.name;
  await redis.del(CACHE_KEY);
  res.json(item);
});

app.delete("/items/:id", async (req, res) => {
  const index = items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ msg: "Item not found" });
  items.splice(index, 1);
  await redis.del(CACHE_KEY);
  res.json({ msg: "Item deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
