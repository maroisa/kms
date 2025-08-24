import DashboardItem from "../../components/DashboardItem.jsx"

import venti from "/assets/venti.jpg"

export default function Dashboard(){
    return <div class="size-full flex flex-col"> 
        <div class="navbar bg-neutral shadow-lg/20">
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
                    <img src={venti} alt="Venti's face" class="size-8 sm:size-10 object-contain" />
                </DashboardItem>
                <DashboardItem name="Tambahin apa kek" href="/dashboard">
                    <img src={venti} alt="Venti's face" class="size-8 sm:size-10 object-contain" />
                </DashboardItem>
            </div>
        </div>
    </div>
}
