import { A, useNavigate } from "@solidjs/router";
import { isAuthorized } from "../lib/api";
import { createSignal, Show } from "solid-js";

export default function App(){
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = createSignal(true)

    isAuthorized().then(res => {
        if (res) {
            navigate("/dashboard", {replace: true})
            return
        }
        setIsLoading(false)
    })

    return <Show when={!isLoading()}>
        <div class="hero h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-6xl font-bold animate-pulse">KMS</h1>
                    <p class="py-4">
                        Silahkan Login untuk mengakses
                    </p>
                    <A class="link" href="/login">Login</A>
                </div>
            </div>
        </div>
    </Show>

}