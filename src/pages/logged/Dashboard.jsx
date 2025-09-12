import DashboardItem from "../../components/DashboardItem.jsx"

import venti from "/assets/venti.jpg"

export default function Dashboard(){
    return <div class="size-full flex flex-col"> 
        <div class="navbar bg-neutral shadow-lg/20 flex justify-center">
            <h1 class="text-2xl font-bold">
                <span class="animate-bounce inline-block">⚡</span>
                <span class="bg-clip-text text-transparent bg-linear-to-r bg-amber-500 to-orange-600">KMS</span>
                <span class="animate-bounce inline-block">⚡</span>
            </h1>
        </div>

        <div class="px-4 min-w-full lg:min-w-4xl mx-auto overflow-x-auto">
            <div class="card card-border bg-base-200 border-neutral my-4">
                <div class="card-body">
                    <h2 class="card-title">¡¡ Pengumuman !!</h2>
                    <p class="font-medium">
                        KMS mengadakan sayembara untuk pembuatan logo KMS.
                        <br />
                        <br />
                        untuk penjelasan lebih lanjut dapat hubungi grup KMS.
                    </p>
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="grid grid-cols-2 sm:grid-cols-2 mt-10 gap-4">
                <DashboardItem name="Mahasiswa PTIK" href="/ptik">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 sm:size-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                </DashboardItem>
                <DashboardItem name="Profilku" href="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 sm:size-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </DashboardItem>
                <DashboardItem name="Submission Logo" href="/submission">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 sm:size-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </DashboardItem>
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
        </div>
    </div>
}
