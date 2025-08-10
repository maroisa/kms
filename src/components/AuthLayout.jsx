import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { checkAuthorized } from "../lib/api";
import { createStore } from "solid-js/store";

export const [allPtik, setAllPtik] = createStore([])
export const [profileDetails, setProfileDetails] = createStore({})

export default function AuthLayout({children}){
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = createSignal(true)

    checkAuthorized().then(isAuthorized => {
        if (!isAuthorized){
            navigate("/", {replace: true})
            return
        }

        setIsLoading(false)
    })

    
    return <Show when={!isLoading()}>
        {children}
    </Show>

    
}