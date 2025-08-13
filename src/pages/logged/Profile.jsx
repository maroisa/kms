import { A } from "@solidjs/router"
import { Show } from "solid-js"

import venti from "/assets/venti.jpg"

import ProfileItem from "../../components/ProfileItem"
import { getPtik } from "../../lib/api"
import { formatDate } from "../../lib/utils"
import { profileDetails, setProfileDetails } from "../../components/AuthLayout"

export default function Profile(){
    if (!profileDetails.nim) {
        getPtik().then(res => {
            res.json().then(json => {
                setProfileDetails(json)
            })
        })
    }


    return <div class="h-full flex flex-col">
        <div class="navbar bg-neutral shadow-lg/25 justify-stretch">
            <A href="/dashboard" class="btn btn-ghost text-xl h-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                Back
            </A>
        </div>

        <div class="p-4 flex flex-col grow gap-10 max-w-2xl sm:mx-auto sm:min-w-xl">
            <h1 class="text-center font-bold text-2xl">Profilku</h1>
            <img src={venti} alt="Muka venti" class="size-40 aspect-square mx-auto rounded-full border-2 border-base-content" />
            <div class="flex flex-col justify-center grow">
                <Show when={profileDetails.nim}>
                    <ProfileItem name="NIM" value={"K35240" + profileDetails.nim.toString().padStart(2, '0')} />
                    <ProfileItem name="Nama" value={profileDetails.nama} />
                    <ProfileItem name="Tempat, Tanggal Lahir" value={profileDetails.tempat_lahir + ", " + formatDate(profileDetails.tanggal_lahir)} />
                </Show>
            </div>
            <A href="/logout" class="btn text-error btn-ghost w-fit ml-auto mt-4">Logout</A>
        </div>
    </div>
}