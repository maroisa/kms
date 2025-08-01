import jwt from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import { and, eq } from "drizzle-orm/expressions";

import { db } from "$lib/server/db/index.js";
import { mahasiswa } from "$lib/server/db/schema.js";

export async function validateUser(data) {
    const user = await db.select().from(mahasiswa).where(
        and(
            eq(mahasiswa.nim, data.absen),
            eq(mahasiswa.tanggal_lahir, data.tglLahir),
        ),
    ).limit(1);

    return user[0];
}

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
