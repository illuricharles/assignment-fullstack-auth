// backend/src/utils/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "secretToken";
const JWT_EXPIRES = process.env.JWT_EXPIRES ?? "7d";

export function signToken(payload: object) {
    return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token: string){
  return jwt.verify(token, JWT_SECRET);
}
