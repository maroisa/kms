import { PUBLIC_API_URL } from "$env/static/public";

export async function get(url) {
    const res = await fetch(PUBLIC_API_URL + "api/" + url, {
        credentials: "include",
    });
    const json = await res.json();
    return json;
}

export async function post(url, data) {
    const res = await fetch(PUBLIC_API_URL + "api/" + url, {
        credentials: "include",
        method: "POST",
        body: data,
    });
    return res;
}

export async function put(url, data) {
    const res = await fetch(PUBLIC_API_URL + "api/" + url, {
        credentials: "include",
        method: "PUT",
        body: data,
    });
    return res;
}

export async function checkAuth() {
    const res = await fetch(PUBLIC_API_URL + "auth", {
        credentials: "include",
    });
    if (res.status >= 400) {
        return false;
    }
    return true;
}
