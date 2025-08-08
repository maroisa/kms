import DashboardItem from "../../components/DashboardItem.jsx"

export default function Dashboard() {
    return <>
        <div class="hero max-h-screen min-h-screen bg-[url('/assets/kys.jpg')] overflow-y-auto">
            <div class="hero-overlay bg-base-300/80"></div>
            <div class="hero-content w-full text-neutral-content text-center">
                <div class="grow sm:max-w-md p-10 bg-base-300 rounded-lg shadow-lg/25">
                    <h1 class="z-2 mb-5 text-5xl font-bold">
                        <span class="animate-bounce inline-block">⚡</span>
                        <span
                            class="bg-clip-text text-transparent bg-linear-to-r bg-amber-500 to-orange-600"
                        >KMS</span>
                        <span class="animate-bounce inline-block">⚡</span>
                    </h1>
                    <p class="z-2 mb-5">
                        Akses khusus member KMS
                    </p>
                    <div class="grid grid-cols-2 sm:grid-cols-2 mt-10 gap-4">
                        <DashboardItem name="Mahasiswa PTIK" href="/ptik">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 sm:size-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                        </DashboardItem>
                        <DashboardItem name="Profilku" href="/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>

                        </DashboardItem>
                        <DashboardItem name="Tambahin apa kek" href="/dashboard">
                            <img src="/assets/venti.jpg" alt="Venti's face" class="size-8 sm:size-10 object-contain" />
                        </DashboardItem>
                    </div>
                </div>
            </div>
        </div>
    </>
}