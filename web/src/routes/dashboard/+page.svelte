<script>
    import SkeletonWebp from "$lib/assets/skeleton.webp";
    import DashboardItem from "$lib/DashboardItem.svelte";
    import Bars3Icon from "$lib/icons/bars-3.svelte";
</script>

<main>
    <div class="flex flex-col h-1/2">
        <div
            class="navbar bg-base-100/90 z-2 border-b-2 border-b-orange-800 border-linear"
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
                        <li>A</li>
                        <li>A</li>
                        <li>A</li>
                    </ul>
                </div>
            </div>
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
                    <p class="font-bold py-8">
                        Your favorite computer lab's guardian
                    </p>
                    <a class="btn btn-default btn-outline" href="#fitur"
                        >Jelajahi Fitur</a
                    >
                </div>
            </div>
        </div>
    </div>
    <div class="bg-base-100 border-t-2 border-t-orange-800 p-2">
        <div class="max-w-6xl mx-auto">
            <h2 id="fitur" class="text-2xl font-bold p-2 py-4 text-center">
                Fitur
            </h2>
            <div class="flex flex-wrap">
                {#each Array(6) as i}
                    <div
                        class="basis-1/2 md:basis-1/3 p-2 md:p-4 aspect-4/3 h-full w-full"
                    >
                        <div
                            class="border-2 border-orange-600 shadow-lg/50 p-4 rounded-lg h-full w-full aspect-video bg-base-200"
                        >
                            <button class="btn btn-primary">Lorem</button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>
