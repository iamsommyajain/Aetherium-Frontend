// src/server.js
import express from "express";
import cors from "cors";
import { getLatest, getAll } from "./fetcher.js";  // ✅ both imports

export function createServer({ apiKey }) {
  const app = express();

  app.use(cors({
    origin: "http://localhost:8080",   // allow only your frontend
    methods: ["GET"],                  // only allow GET
  }));

  // Health check route
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Latest data route
  app.get("/latest", (req, res) => {
    const data = getLatest();
    if (!data) {
      return res.status(503).json({ error: "no data yet" });
    }
    res.json(data);
  });

  // ✅ All data route
  app.get("/all", async (req, res) => {
  try {
    const data = await getAll();
    if (!data || data.length === 0) {
      return res.status(503).json({ error: "no table data yet" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


  return app; // ✅ don’t forget this!
}
