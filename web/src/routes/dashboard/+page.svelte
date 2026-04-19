<script>
    import SkeletonWebp from "$lib/assets/skeleton.webp";
    import dashboardItem from "$lib/dashboardItem";
    import ArrowDownSolid from "$lib/icons/arrowDownSolid.svelte";
    import Bars3Icon from "$lib/icons/bars3.svelte";
    import { checkAuth, get } from "$lib/utils/api";
    import { onMount } from "svelte";

    let isAuth = $state(false);

    let tugas = $state([]);

    onMount(() => {
        checkAuth().then((res) => {
            isAuth = res;
            if (!res) {
                window.location.href = "/login";
            }
        });
        get("tugas").then((res) => (tugas = res));
    });
</script>

{#if isAuth}
    <main>
        <div class="flex flex-col h-1/2">
            <div
                class="navbar bg-base-100/90 z-2 border-b-2 border-b-primary border-linear"
            >
                <div class="navbar-start">
                    <div class="dropdown">
                        <div
                            role="button"
                            tabindex="0"
                            class="btn btn-ghost lg:hidden"
                        >
                            <Bars3Icon />
                        </div>
                        <ul
                            tabindex="-1"
                            class="menu menu-md dropdown-content bg-base-100 z-1 p-2 w-52"
                        >
                            {#each dashboardItem as item}
                                <li>
                                    <a href={item.href}>{item.nama}</a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                    <a href="#" class="btn btn-ghost text-xl">KMS</a>
                </div>
                <div class="navbar-center hidden lg:flex">
                    <ul class="menu menu-horizontal font-semibold">
                        {#each dashboardItem as item}
                            <li>
                                <a href={item.href}>{item.nama}</a>
                            </li>
                        {/each}
                    </ul>
                </div>
                <div class="navbar-end"></div>
            </div>
            <div class="hero grow bg-black/90">
                <img
                    alt="skeleton banging shield background"
                    src={SkeletonWebp}
                    class="absolute w-full h-full object-cover -z-1"
                />
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-4xl font-bold">
                            <span class="animate-bounce inline-block">⚡</span>
                            <span
                                class="bg-clip-text text-transparent bg-linear-to-r bg-amber-500 to-orange-600"
                                >KMS</span
                            >
                            <span class="animate-bounce inline-block">⚡</span>
                        </h1>
                        <p class="font-bold py-6">
                            Your favorite computer lab's guardian
                        </p>
                        <a class="btn btn-default btn-outline" href="#fitur"
                            >Jelajahi Fitur</a
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-base-100 border-t-2 border-t-primary p-2">
            <div class="max-w-6xl mx-auto">
                <h2
                    id="timeline-tugas"
                    class="text-2xl font-bold py-6 text-center"
                >
                    Timeline Tugas
                </h2>
                <ul class="timeline timeline-vertical pb-5">
                    {#each tugas as t}
                        <li>
                            <hr class="bg-primary" />
                            <div
                                class="timeline-start timeline-box border-white text-md md:text-lg"
                            >
                                {t.Deadline}
                            </div>
                            <div class="timeline-middle">
                                <ArrowDownSolid />
                            </div>
                            <div
                                class="timeline-end timeline-box border-white text-md md:text-lg"
                            >
                                {t.Nama}
                            </div>
                            <hr class="bg-primary" />
                        </li>
                    {/each}
                </ul>
                <h2 id="fitur" class="text-2xl font-bold py-6 mt-8 text-center">
                    Fitur
                </h2>
                <div class="flex flex-wrap">
                    {#each dashboardItem as item}
                        <div class="basis-1/2 md:basis-1/3 p-2 sm:p-4">
                            <a
                                href={item.href}
                                class="border-2 border-primary shadow-lg/50 p-4 rounded-lg h-full w-full aspect-4/3 bg-base-200 text-primary text-center flex flex-col justify-center items-center gap-2 md:gap-4"
                            >
                                {@html item.icon}
                                <p class="text-sm md:text-lg font-bold">
                                    {item.nama}
                                </p>
                            </a>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </main>
{/if}
