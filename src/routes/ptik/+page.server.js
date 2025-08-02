import { getAllMahasiswa } from "$lib/server/query.js";

export async function load({ cookies }) {
    const mahasiswa = await getAllMahasiswa();
    return {
        mahasiswa,
    };
}
