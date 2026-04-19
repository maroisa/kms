<script>
    import { post } from "$lib/utils/api.js";
    import ArrowLeft from "$lib/icons/arrowLeft.svelte";
    import Plus from "$lib/icons/plus.svelte";

    function submitForm(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        post("tugas", formData).then((res) => {
            if (res.status == 200) {
                window.location.href = "/tugas";
            } else alert("Gagal menambah tugas!");
        });
    }
</script>

<div class="absolute top-0 left-0 size-full bg-base-200 z-3 p-4">
    <form class="h-full flex justify-center items-center" onsubmit={submitForm}>
        <fieldset class="fieldset bg-base-100 w-xs border border-white/10 p-4">
            <legend class="fieldset-legend">Tambah Tugas</legend>

            <label class="label" for="nama">Nama</label>
            <input
                name="nama"
                type="text"
                class="input"
                placeholder="Presentasi Gelombang Radiasi..."
                required
            />

            <label class="label" for="matkul">Matkul</label>
            <input
                name="matkul"
                type="text"
                class="input"
                placeholder="Jaringan Nirkabel..."
                required
            />
            <label class="label" for="deskripsi">Deskripsi</label>
            <textarea
                name="deskripsi"
                type="text"
                class="textarea"
                placeholder="Menjelaskan minimal 50 slide disertai quis dan contoh..."
                required
            ></textarea>

            <label class="label" for="deadline">Deadline</label>
            <input name="deadline" type="date" min="2026-04-01" class="input" />

            <label class="label" for="link">Link Tugas (opsional)</label>
            <input
                name="link"
                type="url"
                min="2026-04-01"
                class="input"
                placeholder="https://docs.google.com/"
            />
            <div class="flex flex-row mt-2 gap-4 justify-stretch items-stretch">
                <a class="grow btn btn-outline" href=".."
                    ><ArrowLeft /> Kembali</a
                >
                <button class="grow btn btn-primary"><Plus />Tambah</button>
            </div>
        </fieldset>
    </form>
</div>
