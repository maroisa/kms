<script>
    import { onMount } from "svelte";
    import Wolf from "$lib/assets/wolf.webp";
    import MagnifyingGlassIcon from "$lib/icons/magnifyingGlass.svelte";
    import { get } from "$lib/utils/api";

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
        });
    });
</script>

<div class="min-h-full flex flex-col bg-base-200/90">
    {#if ptik.length == 0}
        <div class="flex grow justify-center items-center">
            <img
                class="absolute top-0 left-0 h-full w-full -z-1"
                src={Wolf}
                alt="sad wolf"
            />
            <p class="text-xl font-bold">Saat ini jadwal belum tersedia.</p>
        </div>
    {:else}
        <div class="p-2 py-4 w-full max-w-6xl mx-auto bg-base-100">
            <div
                class="input border-2 border-white mb-4 w-full sticky top-2 z-2"
            >
                <MagnifyingGlassIcon />
                <input
                    bind:value={filter}
                    type="text"
                    placeholder="Cari kata kunci..."
                />
            </div>
            <table
                class="table table-zebra py-2 border-2 border-white rounded-md text-xs md:text-lg"
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
                                <span class="tgl-lahir">{p.TanggalLahir}</span
                                ></td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>
