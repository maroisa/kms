<script>
    let { data } = $props();
    console.log(data.ptik);
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
                {#each data.ptik as ptik}
                    <tr>
                        <td>{ptik.Nim}</td>
                        <td>{ptik.Nama}</td>
                        <td
                            >{ptik.TempatLahir},
                            <span class="tgl-lahir">{ptik.TanggalLahir}</span
                            ></td
                        >
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
