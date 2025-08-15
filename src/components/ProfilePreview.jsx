import { putProfilePict } from "../lib/api"

export default function ProfilePreview({profilePict, refresh}){
    let img = null
    let modalEl

    function getImageURL(){
        img = profilePict()
        if (img == null) return ""
        return URL.createObjectURL(img)
    }

    function submitProfilePict(){
        putProfilePict(img).then(res => {
            if (res.status == 200){
                refresh()
            }
        })
        modalEl.open = false
    }

    return <>
        <dialog ref={modalEl} class="modal" open={profilePict()}>
            <div class="modal-box">
                <p class="py-4">Apakah anda yakin untuk mengganti gambar profil?</p>
                <div class="avatar flex justify-center">
                    <div class="w-32 rounded-full">
                        <img src={getImageURL()} alt="" />
                    </div>
                </div>
                <div class="modal-action">
                    <form method="dialog" class="btn flex-1">
                        <button>Batal</button>
                    </form>
                    <button onclick={submitProfilePict} class="btn btn-primary flex-1">Ganti</button>
                </div>
            </div>
        </dialog>
    </>
}