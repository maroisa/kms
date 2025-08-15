export const URL = "/api/";

export async function checkAuthorized() {
    const res = await fetch(URL + "auth", {
        method: "GET",
        credentials: "include",
    });
    if (res.status == 500) {
        throw new Error(res.statusText);
    }
    return res.ok;
}

export async function postLogin(nim, tanggal_lahir) {
    const res = await fetch(URL + "login", {
        method: "POST",
        body: JSON.stringify({
            nim,
            tanggal_lahir,
        }),
        credentials: "include",
    });

    return res;
}

export async function postLogout() {
    const res = await fetch(URL + "logout", {
        method: "POST",
        credentials: "include",
    });

    return res;
}

export async function getPtik() {
    const res = await fetch(URL + "ptik", {
        method: "GET",
        credentials: "include",
    });
    return res;
}

export async function getUser() {
    const res = await fetch(URL + "user", {
        method: "GET",
        credentials: "include",
    });
    return res;
}

export async function putProfilePict(image){
    const formData = new FormData()
    formData.append("image", image)

    const res = await fetch(URL + "user", {
        method: "PUT",
        body: formData,
        credentials: "include"
    })

    return res
}