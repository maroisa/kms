// const URL = "/api/";
const URL = "http://localhost:5000/";

export async function checkAuthorized() {
  const res = await fetch(URL + "auth", {
    method: "GET",
    credentials: "include",
  });

  return res.status == 200;
}

export async function postLogin(nim, tanggal_lahir) {
  const res = await fetch(URL + "login", {
    method: "POST",
    body: JSON.stringify({
      nim,
      tanggal_lahir
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

export async function getAllPtik() {
  const res = await fetch(URL + "ptik", {
    method: "GET",
    credentials: "include",
  });
  return res;
}

export async function getPtik() {
  const res = await fetch(URL + "ptik/me", {
    method: "GET",
    credentials: "include",
  });
  return res;
}
