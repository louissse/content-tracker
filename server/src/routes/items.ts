import { Hono } from "hono";
import { requireAuth } from "../middleware/auth.js";
import db from "../lib/db.js";

const items = new Hono();

// Hent alle items – alle brugere ser alle items
items.get("/", requireAuth, async (c) => {
  const allItems = await db.contentItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return c.json(allItems);
});

// Opret nyt item
items.post("/", requireAuth, async (c) => {
  const payload = c.get("jwtPayload") as { username: string; role: string };
  const { title, authors, deadline, type, status } = await c.req.json();

  const newItem = await db.contentItem.create({
    data: {
      title,
      authors: authors ?? '',
      deadline: new Date(deadline),
      type,
      createdBy: payload.username,
      status,
    },
  });

  return c.json(newItem, 201);
});

// Rediger item
items.patch("/:id", requireAuth, async (c) => {
  const payload = c.get("jwtPayload") as { username: string; role: string };
  const id = parseInt(c.req.param("id"));
  const { title, authors, deadline, type, status } = await c.req.json();

  const existing = await db.contentItem.findUnique({ where: { id } });
  if (!existing) return c.json({ error: "Item ikke fundet" }, 404);

  if (payload.role === "CONTRIBUTOR" && existing.createdBy !== payload.username) {
    return c.json({ error: "Ingen adgang" }, 403);
  }

  const updated = await db.contentItem.update({
    where: { id },
    data: {
      title,
      authors: authors ?? '',
      deadline: new Date(deadline),
      type,
      status,
    },
  });

  return c.json(updated);
});

// Skift status
items.patch("/:id/status", requireAuth, async (c) => {
  const payload = c.get("jwtPayload") as { username: string; role: string };
  const id = parseInt(c.req.param("id"));
  const { status } = await c.req.json();

  const existing = await db.contentItem.findUnique({ where: { id } });
  if (!existing) return c.json({ error: "Item ikke fundet" }, 404);

  if (payload.role === "CONTRIBUTOR" && existing.createdBy !== payload.username) {
    return c.json({ error: "Ingen adgang" }, 403);
  }

  const updated = await db.contentItem.update({
    where: { id },
    data: { status },
  });

  return c.json(updated);
});

// Arkivér item
items.patch("/:id/archive", requireAuth, async (c) => {
  const payload = c.get("jwtPayload") as { username: string; role: string };
  const id = parseInt(c.req.param("id"));

  const existing = await db.contentItem.findUnique({ where: { id } });
  if (!existing) return c.json({ error: "Item ikke fundet" }, 404);

  if (payload.role === "CONTRIBUTOR" && existing.createdBy !== payload.username) {
    return c.json({ error: "Ingen adgang" }, 403);
  }

  const updated = await db.contentItem.update({
    where: { id },
    data: { status: "ARCHIVED" },
  });

  return c.json(updated);
});

export default items;
