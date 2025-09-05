import express from "express";
import cors from "cors";
import { getLatest, getAll } from "./fetcher.js";

export function createServer({ apiKey }) {
  const app = express();

  // Allow multiple origins (local + Vercel)
  const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:8080",
    "http://localhost:5173", // in case you're using Vite locally
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET"],
    })
  );

  // Health check
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Latest data
  app.get("/latest", (req, res) => {
    const data = getLatest();
    if (!data) {
      return res.status(503).json({ error: "no data yet" });
    }
    res.json(data);
  });

  // All data
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

  return app;
}
