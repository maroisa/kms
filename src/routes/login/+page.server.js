import { generateToken } from "$lib/server/auth.js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const tglLahir = new Date(data.get("tgllahir")).toISOString().split(
            "T",
        )[0].replace("/", "-");

        const newData = {
            absen: data.get("absen"),
            tglLahir,
        };

        const token = await generateToken(newData);
        if (!token) return fail(401, "Invalid Credentials");
        cookies.set("token", token, { path: "/" });
        redirect(301, "/");
    },
};
