import { A } from "@solidjs/router"
import { lazy, createResource, createSignal, Show, Suspense } from "solid-js"
import ProfileItem from "../../components/ProfileItem"
import { getUser, APIURL } from "../../lib/api.js"
import { formatDate } from "../../lib/utils.js"

import SizeAlert from "../../components/SizeAlert.jsx"
import ProfilePreview from "../../components/ProfilePreview.jsx"
import ProfileItemSkeleton from "../../components/ProfileItemSkeleton"

import BackNavbar from "../../components/BackNavbar.jsx"

const [user, {refetch: refresh}] = createResource({}, async () => {
    const res = await getUser()
    if (!res.ok) return {}
    const json = await res.json()
    localStorage.setItem("nim", json.nim)
    return json
})

export default function Profile(){
    const [sizeAlertActive, setSizeAlertActive] = createSignal(false)
    const [newProfilePict, setNewProfilePict] = createSignal(null)
    
    const [profilePict] = createResource(
        () => user()?.pfp,
        async () => {
            if (!user().pfp) return "/assets/venti.jpg"
            
            const res = await fetch(APIURL + "/uploads/pfp/" + user().pfp)
            const blob = await res.blob()
            return URL.createObjectURL(blob)
        }
    )
    
    let inputFile


    function editProfilePict(event){
        const img = event.target.files[0]
        if (img.size > 1048576){
            setSizeAlertActive(true)
            return
        }
        
        setNewProfilePict(img)
    }


    return <div class="h-full flex flex-col">
        <BackNavbar title={"Profilku"} />

        <div class="p-4 flex flex-col grow gap-10 max-w-2xl sm:mx-auto sm:min-w-xl">
            <h1 class="text-center font-bold text-2xl">Profilku</h1>
            <div class="avatar mx-auto">
                <div class="w-40 rounded-full">
                    <Show when={profilePict()} fallback={
                        <div class="skeleton rounded-full h-full"></div>
                    }>
                        <img src={profilePict()} />
                    </Show >
                    <input 
                        ref={inputFile}
                        onchange={editProfilePict}
                        type="file"
                        class="hidden"
                        accept="image/png, image/jpeg"
                    />
                    <button
                        onclick={() => inputFile.click()}
                        class="absolute w-full h-full top-0 bg-black/60 opacity-0 hover:opacity-50 active:opacity-100 rounded-full"
                    >
                        <svg class="size-8 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex flex-col justify-center grow">
                <Suspense fallback={<ProfileItemSkeleton />}>
                    <ProfileItem name="NIM" value={"K35240" + user()?.nim.toString().padStart(2, '0')} />
                    <ProfileItem name="Nama" value={user()?.nama} />
                    <ProfileItem name="Tempat, Tanggal Lahir" value={user()?.tempat_lahir + ", " + formatDate(user()?.tanggal_lahir)} />
                </Suspense>
            </div>
            <A href="/logout" class="btn text-error btn-ghost w-fit ml-auto mt-4">Logout</A>
        </div>
        
        <SizeAlert active={sizeAlertActive} setActive={setSizeAlertActive} />
        <ProfilePreview newProfilePict={newProfilePict} refresh={refresh} />
    </div>
}
