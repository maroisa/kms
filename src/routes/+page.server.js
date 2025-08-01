import { error } from "@sveltejs/kit";
import { verifyToken } from "$lib/auth.js";

export function load({ cookies }) {
    const token = cookies.get("token");
    const user = verifyToken(token);

    if (!user) throw error(401, "Unathorized");
    return { user };
}
