import { createEffect } from "solid-js";

export default function RatioAlert({active, setActive}){
    createEffect(() => {
        if (!active()) return
        
        setTimeout(() => {
            setActive(false)
        }, 2000);
    })


    return <div class={`fixed w-full top-0 z-1 transition-all ${active() ? "opacity-100 scale-100 visible" : "opacity-0 scale-90 invisible"}`}>
        <div role="alert" class="alert alert-error m-4 shadow-lg/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Aspect Ratio harus 1:1</span>
        </div>
    </div>
}