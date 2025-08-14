import { A } from "@solidjs/router"
import { createSignal, Show } from "solid-js"

import ProfileItem from "../../components/ProfileItem"
import { getPtik, URL } from "../../lib/api"
import { formatDate } from "../../lib/utils"
import { profileDetails, setProfileDetails } from "../../components/AuthLayout"
import SizeAlert from "../../components/SizeAlert"
import ProfilePreview from "../../components/ProfilePreview"

export default function Profile(){
    const [sizeAlertActive, setSizeAlertActive] = createSignal(false)
    const [profilePict, setProfilePict] = createSignal(null)

    let inputFile

    if (!profileDetails.nim) {
        refresh()
    }
    
    function refresh(){
        getPtik().then(res => {
            res.json().then(json => {
                setProfileDetails(json)
            })
        })
    }

    function getProfilePict(){
        if (profileDetails.pfp){
            return URL + "uploads/" + profileDetails.pfp
        }

        return "/assets/venti.jpg"
    }

    function editProfile(event){
        const img = event.target.files[0]
        if (img.size > 1048576){
            setSizeAlertActive(true)
            return
        }
        
        setProfilePict(img)
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
            <div class="avatar mx-auto w-40">
                <div>
                    <img src={getProfilePict()} alt="Muka venti" class="rounded-full" />
                    <input type="file" ref={inputFile} class="hidden" accept="image/png, image/jpeg" onchange={editProfile} />
                    <button onclick={() => inputFile.click()} class="rounded-full w-full h-full absolute top-0 bg-black/75 flex justify-center items-center opacity-0 active:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex flex-col justify-center grow">
                <Show when={profileDetails.nim}>
                    <ProfileItem name="NIM" value={"K35240" + profileDetails.nim.toString().padStart(2, '0')} />
                    <ProfileItem name="Nama" value={profileDetails.nama} />
                    <ProfileItem name="Tempat, Tanggal Lahir" value={profileDetails.tempat_lahir + ", " + formatDate(profileDetails.tanggal_lahir)} />
                </Show>
            </div>
            <A href="/logout" class="btn text-error btn-ghost w-fit ml-auto mt-4">Logout</A>
        </div>
        
        <SizeAlert active={sizeAlertActive} setActive={setSizeAlertActive} />
        <ProfilePreview profilePict={profilePict} refresh={refresh} />
    </div>
}