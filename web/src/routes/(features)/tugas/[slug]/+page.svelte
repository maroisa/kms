<script>
    import { onMount } from "svelte";
    import { get, put } from "$lib/utils/api.js";
    import Pencil from "$lib/icons/pencil.svelte";
    import ArrowLeft from "$lib/icons/arrowLeft.svelte";
    let { params } = $props();

    let data = $state({});

    onMount(() => {
        get("tugas/" + params.slug).then((res) => (data = res));
    });

    function submitForm(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        put("tugas/" + params.slug, formData).then((res) => {
            if (res.status == 200) {
                window.location.href = "/tugas";
            } else alert("Gagal update!");
        });
    }
</script>

<div class="absolute top-0 left-0 size-full bg-base-200 z-3 p-4">
    <form class="h-full flex justify-center items-center" onsubmit={submitForm}>
        <fieldset class="fieldset bg-base-100 w-xs border border-white/10 p-4">
            <legend class="fieldset-legend">Edit Tugas</legend>

            <label class="label" for="nama">Nama</label>
            <input
                name="nama"
                type="text"
                class="input"
                placeholder="Presentasi Gelombang Radiasi..."
                value={data.Nama}
                required
            />

            <label class="label" for="matkul">Matkul</label>
            <input
                name="matkul"
                type="text"
                class="input"
                placeholder="Jaringan Nirkabel..."
                value={data.Matkul}
                required
            />
            <label class="label" for="deskripsi">Deskripsi</label>
            <textarea
                name="deskripsi"
                type="text"
                class="textarea"
                placeholder="Menjelaskan minimal 50 slide disertai quis dan contoh..."
                value={data.Deskripsi}
                required
            ></textarea>

            <label class="label" for="deadline">Deadline</label>
            <input
                name="deadline"
                type="date"
                min="2026-04-01"
                class="input"
                value={data.Deadline}
            />

            <label class="label" for="link">Link Tugas (opsional)</label>
            <input
                name="link"
                type="url"
                min="2026-04-01"
                class="input"
                placeholder="https://docs.google.com/"
                value={data.Link}
            />
            <div class="flex flex-row mt-2 gap-4 justify-stretch items-stretch">
                <a class="grow btn btn-outline" href=".."
                    ><ArrowLeft /> Kembali</a
                >
                <button class="grow btn btn-primary"><Pencil />Edit</button>
            </div>
        </fieldset>
    </form>
</div>
