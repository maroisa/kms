<script>

let {data} = $props()

</script>

<div class="navbar bg-neutral shadow-lg/25">
  <a href="/" class="btn btn-ghost text-xl h-full block flex">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
    Back
  </a>
</div>

<div class="overflow-x-auto">
  <table class="table">
    <thead>
        <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Tempat, Tanggal Lahir</th>
        </tr>
    </thead>
    <tbody>
        {#each data.mahasiswa as mahasiswa}
            <tr>
                <td>K35240{mahasiswa.nim.toString().padStart(2, '0')}</td>
                <td>{mahasiswa.nama}</td>
                <td>{mahasiswa.tempat_lahir + ', ' + mahasiswa.tanggal_lahir}</td>
            </tr>
        {/each}
    </tbody>
  </table>
</div>