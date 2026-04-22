<script>
    import ArrowLeft from "$lib/icons/arrowLeft.svelte";
    import Pencil from "$lib/icons/pencil.svelte";
    import Plus from "$lib/icons/plus.svelte";
    import { get } from "$lib/utils/api";
    import { onMount } from "svelte";

    let data = $state([]);

    onMount(() => {
        get("tugas/lama").then((res) => {
            data = res;
        });
    });
</script>

<div class="h-full bg-base-200 p-4 md:p-8">
    <div class="bg-base-100 p-4 m-auto max-w-6xl border-2 border-white/10">
        <h2 class="font-bold text-2xl text-center">Tugas Usang</h2>
        <a
            href=".."
            class="btn btn-outline btn-secondary rounded-none mt-4 md:w-max"
            ><span><ArrowLeft /></span> Kembali</a
        >
        <div class="flex flex-col gap-2 mt-4">
            {#each data as tugas}
                <div
                    class="border border-white/10 bg-base-200/20 flex flex-col md:flex-row items-center"
                >
                    <div class="flex flex-col gap-2 grow p-4">
                        <div>
                            <h2 class="font-bold text-lg">{tugas.Nama}</h2>
                            <p class="opacity-70 italic">{tugas.Matkul}</p>
                        </div>
                        <p>{tugas.Deskripsi}</p>
                        <p class="text-warning">Deadline: {tugas.Deadline}</p>
                        <div>
                            {#if tugas.Link}
                                <p>Links:</p>
                                <a
                                    target="_blank"
                                    class="link block text-blue-400"
                                    href={tugas.Link}>{tugas.Link}</a
                                >
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
