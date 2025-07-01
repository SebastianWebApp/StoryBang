import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";

export function createToken(Id) {
  return jwt.sign({ Id }, JWT_SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET_KEY);
}