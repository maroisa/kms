import { verifyToken } from "$lib/server/auth.js";
import { error } from "@sveltejs/kit";

export function load({ cookies }) {
    const token = cookies.get("token");
    const user = verifyToken(token);

    if (!user) return error(401, "Unathorized");
    return { user };
}
