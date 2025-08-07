import { A } from "@solidjs/router"
import { createSignal, Show } from "solid-js"

import ProfileItem from "../../components/ProfileItem"
import { getPtik } from "../../lib/api"
import { formatDate } from "../../lib/utils"

export default function Profile(){
    const [mahasiswa, setMahasiswa] = createSignal({})

    getPtik().then(res => {
        res.json().then(json => {
            setMahasiswa(json)
        })
    })

    return <>
        <div class="navbar bg-neutral shadow-lg/25 justify-stretch">
            <A href="/" class="btn btn-ghost text-xl h-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Back
            </A>
        </div>

        <div class="p-4 flex flex-col gap-4 max-w-lg m-auto">
            <h1 class="text-center font-bold text-xl">Profilku</h1>
            <img src="/assets/venti.jpg" alt="Muka venti" class="size-1/2 m-auto" />
            <div class="flex flex-col">
                <Show when={mahasiswa().nim}>
                    <ProfileItem name="NIM" value={"K35240" + mahasiswa().nim.toString().padStart(2, '0')} />
                    <ProfileItem name="Nama" value={mahasiswa().nama} />
                    <ProfileItem name="Tempat, Tanggal Lahir" value={mahasiswa().tempat_lahir + ", " + formatDate(mahasiswa().tanggal_lahir)} />
                </Show>
            </div>
            <A href="/logout" class="btn btn-error w-fit mx-auto mt-4">Logout</A>
        </div>
    </>
}