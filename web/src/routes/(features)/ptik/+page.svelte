<script>
    import { onMount } from "svelte";
    import Wolf from "$lib/assets/wolf.webp";
    import MagnifyingGlassIcon from "$lib/icons/magnifyingGlass.svelte";
    import { get } from "$lib/utils/api";
    import formatDate from "$lib/formatDate";

    let isLoading = $state(true);
    let ptik = $state([]);
    let filteredPtik = $state([]);
    let filter = $state("");
    let timeout = setTimeout(() => {}, 0);

    $effect(() => {
        clearTimeout(timeout);

        let lowerFilter = filter.toLowerCase();

        if (filter == "") {
            filteredPtik = ptik;
            return;
        }

        let arr = ptik.filter((item) => {
            return Object.values(item).some((value) => {
                return String(value).toLowerCase().includes(lowerFilter);
            });
        });

        timeout = setTimeout(() => {
            filteredPtik = arr;
        }, 300);
    });

    onMount(async () => {
        get("ptik").then((res) => {
            ptik = res;
            isLoading = false;
        });
    });
</script>

<div class="min-h-full flex flex-col">
    <div class="p-2 py-4 w-full max-w-6xl mx-auto bg-base-100">
        <div
            class="input border-2 border-white mb-4 w-full sticky top-2 z-2 rounded-none"
        >
            <MagnifyingGlassIcon />
            <input
                bind:value={filter}
                type="text"
                placeholder="Cari kata kunci..."
            />
        </div>
        {#if isLoading}
            <div class="border-2 border-white flex flex-col gap-4 p-4">
                <div class="flex h-12 gap-2">
                    <div class="skeleton flex-1 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                </div>
                <div class="flex h-12 gap-2">
                    <div class="skeleton flex-1 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                </div>
                <div class="flex h-12 gap-2">
                    <div class="skeleton flex-1 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                </div>
                <div class="flex h-12 gap-2">
                    <div class="skeleton flex-1 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                </div>
                <div class="flex h-12 gap-2">
                    <div class="skeleton flex-1 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                </div>
                <div class="flex h-12 gap-2">
                    <div class="skeleton flex-1 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                    <div class="skeleton flex-2 h-12"></div>
                </div>
            </div>
        {:else}
            <table
                class="table table-zebra py-2 border-2 border-white text-xs md:text-lg rounded-none"
            >
                <thead>
                    <tr>
                        <th>NIM</th>
                        <th>Nama</th>
                        <th>Tempat, Tanggal Lahir</th>
                    </tr>
                </thead>
                <tbody>
                    {#each filteredPtik as p}
                        <tr>
                            <td>{p.Nim}</td>
                            <td>{p.Nama}</td>
                            <td
                                >{p.TempatLahir},
                                <span class="tgl-lahir"
                                    >{formatDate(p.TanggalLahir)}</span
                                ></td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>
