export const BASE_URL = "http://localhost:3000/"

export async function get(url) {
    const res = await fetch(BASE_URL + "api/" + url, {
        credentials: "include"
    })
    const json = await res.json()
    return json
}

export async function post(url, data) {
    const res = await fetch(BASE_URL + "api/" + url, {
        credentials: "include",
        method: "POST",
        body: data
    })
    return res
}

export async function checkAuth() {
    const res = await fetch(BASE_URL + "auth", { credentials: "include" })
    if (res.status >= 400) {
        return false
    }
    return true
}

