import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("curricuforge.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS curricula (
    id TEXT PRIMARY KEY,
    type TEXT,
    data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS trends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    tech_name TEXT,
    adoption_rate REAL,
    demand_rate REAL,
    growth_data TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/curricula", (req, res) => {
    const { id, type, data } = req.body;
    const stmt = db.prepare("INSERT INTO curricula (id, type, data) VALUES (?, ?, ?)");
    stmt.run(id, type, JSON.stringify(data));
    res.json({ success: true });
  });

  app.get("/api/curricula/:id", (req, res) => {
    const stmt = db.prepare("SELECT * FROM curricula WHERE id = ?");
    const row = stmt.get(req.params.id) as any;
    if (row) {
      res.json({ ...row, data: JSON.parse(row.data) });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
