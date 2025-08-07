const URL = "http://localhost:5000/"


export async function isAuthorized(){
    const res = await fetch(URL + "auth", {
        method: "GET",
        credentials: "include"
    })

    return res.status == 200
}


export async function postLogin(nim, tanggal_lahir){
    const formData = new FormData()
    formData.set("nim", nim)
    formData.set("tanggal_lahir", tanggal_lahir)

    const res = await fetch(URL + "login", {
        method: "POST",
        body: formData,
        credentials: "include",
    })

    return res
}

export async function logout(){
    const res = await fetch(URL + "logout", {
        method: "POST",
        credentials: "include"
    })

    return res
}

export async function getAllPtik(){
    
    const res = await fetch(URL + "ptik", {
        method: "GET",
        credentials: "include"
    })
    return res
}

export async function getPtik(){
    const res = await fetch(URL + "ptik/me", {
        method: "GET",
        credentials: "include"
    })
    return res
}