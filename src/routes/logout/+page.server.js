import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
    cookies.delete("token", { path: "/" });
    redirect(301, "/");
}
