import { getMahasiswa } from "$lib/server/query.js";

export const load = async ({ cookies, parent }) => {
    const { user } = await parent();

    const mahasiswa = await getMahasiswa(Number(user.absen));
    return { mahasiswa };
};
