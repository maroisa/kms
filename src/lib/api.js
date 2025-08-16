export const APIURL = "/api/";

export async function checkAuthorized() {
    const res = await fetch(APIURL + "auth", {
        method: "GET",
        credentials: "include",
    });
    if (res.status == 500) {
        throw new Error(res.statusText);
    }
    return res.ok;
}

export async function postLogin(nim, tanggal_lahir) {
    const res = await fetch(APIURL + "login", {
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
    const res = await fetch(APIURL + "logout", {
        method: "POST",
        credentials: "include",
    });

    return res;
}

export async function getPtik() {
    const res = await fetch(APIURL + "ptik", {
        method: "GET",
        credentials: "include",
    });
    return res;
}

export async function getUser() {
    const res = await fetch(APIURL + "user", {
        method: "GET",
        credentials: "include",
    });
    return res;
}

export async function putProfilePict(image){
    const formData = new FormData()
    formData.append("image", image)

    const res = await fetch(APIURL + "user", {
        method: "PUT",
        body: formData,
        credentials: "include"
    })

    return res
}

export async function getSubmission(){
    const res = await fetch(APIURL + "submission", {
        method: "GET",
        credentials: "include"
    })
    const json = await res.json()

    if (!json.length) return {}

    const fullRes = json.map(item => {
        if (!item.pfp) {
            item.pfp = "/assets/venti.jpg"
            return item
        }
        
        fetch(APIURL + "/uploads/pfp/" + item.pfp)
        .then(res => res.blob())
        .then(blob => {item.pfp = URL.createObjectURL(blob)})
        return item
    })


    return fullRes
}

export async function postSubmission(image) {
    const formData = new FormData()
    formData.append("image", image)

    const res = await fetch(APIURL + "submission", {
        method: "POST",
        body: formData,
        credentials: "include"
    })
    return res
}

export async function postSubmissionScore(submission_id) {
    const res = await fetch(APIURL + "submission/score/" + submission_id, {
        method: "POST",
        credentials: "include"
    })
    return res
}