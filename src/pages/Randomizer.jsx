import { createSignal } from "solid-js";
import BackNavbar from "../components/BackNavbar.jsx";

export default function Randomizer(){
    let [clipboardActive, setClipboardActive] = createSignal(false)

    let textarea
    let data = []

    function handleTextarea(e){
        let value = e.target.value
        value = value.split(/\s+/gi)
        data = value
    }

    function handleShuffle(){
        let randomized = shuffleArray(data)
        randomized = randomized.join("\n")
        textarea.value = randomized
    }

    function copyToClipboard(){
        if (clipboardActive()) return
        setClipboardActive(true)
        navigator.clipboard.writeText(data.join("\n"))
        setTimeout(() => {
            setClipboardActive(false)
        }, 2000);
    }
    
    return <div class="h-full flex flex-col">
        <BackNavbar title="Randomizer" />
        <div class="flex-1 overflow-auto min-w-full md:min-w-2xl mx-auto">
            <div class="m-4">
                <textarea ref={textarea} onChange={handleTextarea} class="textarea h-80 w-full whitespace-pre" placeholder="Masukkan daftar..."></textarea>
                <div class="flex gap-2 mt-4">
                    <button onclick={copyToClipboard} class="btn btn-outline flex-1">Salin</button>
                    <button onclick={handleShuffle} class="btn btn-primary flex-1">Acak</button>
                </div>
            </div>
        </div>
        <div role="alert" class={`alert alert-info m-4 transition-all ${clipboardActive() ? "scale-100 opacity-100 visible" : "scale-90 opacity-0 invisible"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Daftar telah disalin!</span>
        </div>
    </div>
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}