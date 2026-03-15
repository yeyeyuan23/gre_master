import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check and API key status
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.API_KEY,
    hasGeminiApiKey: !!process.env.GEMINI_API_KEY,
    env: process.env.NODE_ENV
  });
});

// Vite middleware for development
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static("dist"));
  app.get("*", (req, res) => res.sendFile("dist/index.html", { root: "." }));
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
