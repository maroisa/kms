import jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import { validateUser } from "$lib/server/query.js";

export async function generateToken(data) {
    const valid = await validateUser(data);
    if (!valid) return undefined;

    if (!env.JWT_PASSWORD) throw new Error("JWT_PASSWORD is not set");
    return jwt.sign(data, env.JWT_PASSWORD);
}

export function verifyToken(token) {
    if (!env.JWT_PASSWORD) throw new Error("JWT_PASSWORD is not set");

    try {
        return jwt.verify(token, env.JWT_PASSWORD);
    } catch (err) {
        return null;
    }
}
