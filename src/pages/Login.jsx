import { postLogin } from "../lib/api"
import { useNavigate } from "@solidjs/router"
import { createSignal } from "solid-js"

export default function Login(){
    let loginForm

    const navigate = useNavigate()
    const [toastActive, setToastActive] = createSignal(false)

    function submit(event){
        event.preventDefault()

        const data = {
            nim: loginForm["nim"].value,
            tanggal_lahir: loginForm["tanggal_lahir"].value
        }

        postLogin(data.nim, data.tanggal_lahir).then(res => {
            if (res.status != 200){
                setToastActive(true)
                setTimeout(() => {
                    setToastActive(false)
                }, 2000);
            }

            navigate("/", {replace: true})
        })
    }

    return <>
        <div class="toast toast-top toast-end" hidden={!toastActive()}>
            <div class="alert alert-error">
                <span class="font-medium">NIM atau Tanggal tidak sesuai</span>
            </div>
        </div>

        <div class="w-screen h-screen flex justify-center items-center">
            <form ref={loginForm} method="POST" onsubmit={submit}>
                <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend class="fieldset-legend">Login</legend>
            
                    <label for="nim" class="label">Nomor Absen</label>
                    <input name="nim" type="number" class="input" placeholder="contoh: 10" max="86" min="1" />
            
                    <label for="tanggal_lahir" class="label">Tanggal Lahir</label>
                    <input name="tanggal_lahir" type="date" class="input" placeholder="Tanggal Lahir" required />

                    <button type="submit" class="btn btn-primary mt-4">Login</button>
                </fieldset>
            </form>
        </div>
    </>
}