import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

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
