import { A, useNavigate } from "@solidjs/router";
import { checkAuthorized } from "../lib/api.js";
import { createSignal, Show } from "solid-js";
import DashboardItem from "../components/DashboardItem.jsx";

export default function App() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = createSignal(true);

    checkAuthorized().then((res) => {
        if (res) {
            navigate("/dashboard", { replace: true });
            return;
        }
        setIsLoading(false);
    }).catch((err) => {
        console.log(err);
        navigate("/500", { replace: true });
    });

    return (
        <Show when={!isLoading()}>
            <div class="h-full">
                <div class="text-center flex flex-col h-full gap-4 w-full p-10 md:max-w-2xl mx-auto">
                    <h1 class="text-2xl font-bold">
                        <span class="animate-bounce inline-block">⚡</span>
                        <span class="bg-clip-text text-transparent bg-linear-to-r bg-amber-500 to-orange-600">KMS</span>
                        <span class="animate-bounce inline-block">⚡</span>
                    </h1>
                    <div class="grow-1 content-center grid grid-cols-2 sm:grid-cols-2 gap-4 w-full">
                        <DashboardItem name="Jadwal" href="/jadwal">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 sm:size-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                        </DashboardItem>
                        <DashboardItem name="Pengacak" href="/shuffle">
                        <svg class="size-8 sm:size-10" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 122.88 105.71">
                            <path class="st0" d="M0,79.45c-0.02-1.95,0.76-3.06,2.51-3.18h14.08c5.98,0,8.89,0.16,13.98-3.91c1.08-0.86,2.1-1.86,3.06-3 c4.55-5.41,6.17-11.96,7.87-18.9C44.79,37,50.03,22.78,63.98,17.15c7.94-3.2,18.82-2.59,27.41-2.59h5.27l0.01-10.05 c0-5.01,1.18-5.88,4.79-2.45l19.55,18.58c2.36,2.24,2.03,3.7-0.22,5.86L101.49,45c-3.37,3.41-4.89,2.45-4.82-2.26v-11.8 c-34-0.52-32.57,1.67-42.05,34.09c-3.5,10.04-8.81,17.08-15.59,21.69c-7.09,4.82-13.68,6.39-22.02,6.39H6.65 C0.71,93.11,0,92.83,0,86.75V79.45L0,79.45z M0.23,26.26c-0.02,1.95,0.76,3.06,2.51,3.18h14.7c5.98,0,8.89-0.16,13.98,3.91 c1.08,0.86,2.1,1.86,3.06,3c1.16,1.38,2.13,2.84,2.96,4.35c1.5-4.69,3.36-9.29,5.82-13.5c0.7-1.19,1.44-2.35,2.23-3.48 c-1.74-1.8-3.61-3.37-5.61-4.73c-7.09-4.82-13.68-6.39-22.02-6.39H6.88c-5.94,0-6.65,0.28-6.65,6.36V26.26L0.23,26.26z M53.57,80.45c2.96,3.42,6.63,6.24,11.27,8.11c7.94,3.2,18.21,2.59,26.8,2.59h5.27l0.01,10.05c0,5.01,1.18,5.88,4.79,2.45 l19.55-18.58c2.36-2.24,2.03-3.7-0.22-5.86l-19.3-18.5c-3.37-3.41-4.89-2.45-4.82,2.26v11.8c-24.78,0.38-30.42-0.69-35.32-13.84 c-0.27,0.94-0.64,2.23-1.93,6.65c-0.03,0.1-0.06,0.19-0.09,0.28l0,0C57.91,72.62,55.9,76.79,53.57,80.45L53.57,80.45z"/>
                        </svg>
                        </DashboardItem>
                    </div>
                    <div class="flex flex-col gap-4">
                        <A href="/login" class="btn btn-primary">
                        Login
                        </A>
                    </div>
                </div>
            </div>
        </Show>
    );
}
