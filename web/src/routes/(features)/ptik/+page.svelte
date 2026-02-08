<script>
    import { onMount } from "svelte";

    let ptik = $state([]);

    onMount(async () => {
        const result = await fetch("http://localhost:3000/api/ptik");
        const json = await result.json();
        ptik = json;
    });
</script>

<div class="bg-base-200">
    <div class="p-2 py-4 max-w-6xl mx-auto bg-base-100">
        <table class="table table-zebra py-2 border-2 border-white rounded-md">
            <thead>
                <tr>
                    <th>NIM</th>
                    <th>Nama</th>
                    <th>Tempat, Tanggal Lahir</th>
                </tr>
            </thead>
            <tbody>
                {#each ptik as p}
                    <tr>
                        <td>{p.Nim}</td>
                        <td>{p.Nama}</td>
                        <td
                            >{p.TempatLahir},
                            <span class="tgl-lahir">{p.TanggalLahir}</span></td
                        >
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
