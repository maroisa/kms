<script>
    import Clock from "$lib/icons/Clock.svelte";
    import Pencil from "$lib/icons/pencil.svelte";
    import Plus from "$lib/icons/plus.svelte";
    import { get } from "$lib/utils/api";
    import formatDate from "$lib/formatDate";
    import { onMount } from "svelte";

    let data = $state([]);

    onMount(() => {
        get("tugas").then((res) => {
            data = res;
        });
    });
</script>

<div class="h-full bg-base-200 p-4 md:p-8">
    <div class="bg-base-100 p-4 m-auto max-w-6xl border-2 border-white/10">
        <h2 class="font-bold text-2xl text-center">Running Tasks</h2>
        <div class="flex flex-col gap-2 mt-4">
            {#each data as tugas}
                <div
                    class="border border-white/10 bg-base-200/20 flex flex-col md:flex-row items-center"
                >
                    <div class="flex flex-col gap-2 grow p-4 w-full">
                        <div>
                            <h2 class="font-bold text-lg">{tugas.Nama}</h2>
                            <p class="opacity-70 italic">{tugas.Matkul}</p>
                        </div>
                        <p>{tugas.Deskripsi}</p>
                        <p class="text-warning">
                            Deadline: {formatDate(tugas.Deadline)}
                        </p>
                        <div>
                            {#if tugas.Link}
                                <p>Links:</p>
                                <a
                                    class="link block"
                                    href={"https://" + tugas.Link}>{link}</a
                                >
                            {/if}
                        </div>
                    </div>
                    <a
                        href={"edit?id=" + tugas.ID}
                        class="btn rounded-none flex md:flex-col w-full md:w-auto md:py-8 mx-4"
                    >
                        <span>
                            <Pencil />
                        </span>
                        Edit
                    </a>
                </div>
            {/each}
            <div class="flex flex-col md:flex-row md:gap-2">
                <a
                    href="tambah"
                    class="btn btn-outline btn-primary rounded-none mt-4 md:w-max"
                    ><span><Plus /></span> Tambah Tugas</a
                >
                <span class="grow"></span>
                <a
                    href="lama"
                    class="btn btn-outline btn-secondary rounded-none mt-4 md:w-max"
                    ><span><Clock /></span> Lihat Tugas Lama</a
                >
            </div>
        </div>
    </div>
</div>
