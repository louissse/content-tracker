import { Hono } from "hono";
import { sign } from "hono/jwt";
import { USERS } from "../middleware/auth.js";

const auth = new Hono();

auth.post("/login", async (c) => {
  const { username, password } = await c.req.json();

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return c.json({ error: "Forkert brugernavn eller adgangskode" }, 401);
  }

  const secret = process.env["JWT_SECRET"]!;

  const token = await sign(
    {
      username: user.username,
      role: user.role,
      // Token udløber efter 24 timer
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    secret,
    "HS256"
  );

  return c.json({ token });
});

export default auth;
