const tglLahir = document.getElementsByClassName("tgl-lahir")
for (let i = 0; i < tglLahir.length; i++) {
    let date = new Date(tglLahir[i].innerHTML)
    date = date.toLocaleDateString("id-ID", {dateStyle:"long"})
    tglLahir[i].innerHTML = date
}