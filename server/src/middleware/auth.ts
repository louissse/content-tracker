import { jwt } from "hono/jwt";

// Hardcodede brugere – i et rigtigt system ville disse ligge i en database
export const USERS = [
  { username: "andreas", password: "andreas123", role: "EDITOR" },
  { username: "louise", password: "louise123", role: "CONTRIBUTOR" },
  { username: "mette", password: "mette123", role: "CONTRIBUTOR" },
];

const jwtSecret = process.env["JWT_SECRET"];
if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set");
}

// Middleware der tjekker at requestet har et gyldigt JWT-token
// HS256 er den algoritme vi bruger til at signere tokens
export const requireAuth = jwt({ secret: jwtSecret, alg: "HS256" });
