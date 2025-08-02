import { getMahasiswa } from "$lib/server/query.js";
import { verifyToken } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
    const token = cookies.get("token");
    const user = verifyToken(token);
    if (!user) return redirect(301, "/login");

    const mahasiswa = await getMahasiswa(Number(user.absen));
    return { mahasiswa };
}
