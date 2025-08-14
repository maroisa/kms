import { createEffect } from "solid-js"

export default function SizeAlert({active, setActive}){
    createEffect(() => {
        if (active()){
            setTimeout(() => {
                setActive(false)
            }, 2000);
        }
    })

    return <div class={`absolute w-full bottom-0 ${active() ? "visible" : "invisible"}`}>
        <div role="alert" class="alert alert-error m-2">
            <span>Gambar terlalu besar!</span>
        </div>
    </div>
}