import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import auth from "./routes/auth.js";
import items from "./routes/items.js";

const app = new Hono();

// CORS – tillader frontend (port 5173) at kalde API'et
app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.route("/auth", auth);
app.route("/items", items);

app.get("/", (c) => {
  return c.json({ message: "Content Tracker API is running" });
});

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  () => {
    console.log("Server running on http://localhost:3001");
  }
);
