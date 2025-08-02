import { verifyToken } from "$lib/server/auth.js";
import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, url }) => {
    const pathname = url.pathname;

    if (pathname == "/" || pathname == "/login" || pathname == "/logout") {
        return;
    }

    const token = cookies.get("token");
    const user = verifyToken(token);
    if (!user) return redirect(301, "/");
    return { user };
};
