<script>
    import { form } from "$app/server";
import ProfileItem from "$lib/ProfileItem.svelte";
let {data} = $props()

function formatDate(dateString){
    const date = new Date(dateString).toLocaleDateString("id-ID", {day: "numeric", month: "long", year: "numeric"})
    console.log(date)
    return date
}

</script>


<div class="navbar bg-neutral shadow-lg/25 justify-stretch">
  <a href="/" class="btn btn-ghost text-xl h-full">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
    Back
  </a>
</div>

<div class="p-4 flex flex-col gap-4 max-w-lg m-auto">
    <h1 class="text-center font-bold text-xl">Profilku</h1>
    <img src="/venti.webp" alt="Muka venti" class="size-1/2 m-auto">
    <div class="flex flex-col">
        <ProfileItem name="NIM" value={"K35240" + data.mahasiswa.nim.toString().padStart(2, '0')} />
        <ProfileItem name="Nama" value={data.mahasiswa.nama} />
        <ProfileItem name="Tempat, Tanggal Lahir" value={data.mahasiswa.tempat_lahir + ", " + formatDate(data.mahasiswa.tanggal_lahir)} />
    </div>
    <a href="/logout" class="btn btn-error w-fit mx-auto mt-4">Logout</a>
</div>