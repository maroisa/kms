import { db } from "$lib/server/db/index.js";
import { and, eq } from "drizzle-orm/expressions";
import { authorized_mahasiswa, mahasiswa } from "$lib/server/db/schema.js";

export async function validateUser(data) {
    const user = await db.select().from(authorized_mahasiswa).leftJoin(
        mahasiswa,
        eq(authorized_mahasiswa.nim, mahasiswa.nim),
    ).where(
        and(
            eq(mahasiswa.nim, data.absen),
            eq(mahasiswa.tanggal_lahir, data.tglLahir),
        ),
    ).limit(1);

    return user[0];
}

export async function getMahasiswa() {
    return await db.select().from(mahasiswa);
}
