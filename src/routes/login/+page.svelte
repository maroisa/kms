<script>
    import {page} from "$app/state"
    import { onMount } from "svelte";

    let toastActive = $state(page.status != 200)

    $effect(() => {
        if (toastActive){
            setTimeout(() => toastActive = false, 3000)
        }
    })

    let absen = $state()

    $effect(() => {
        if (absen > 86) absen = 86
        else if (absen < 0) absen = 0
    })
</script>

<div class="toast toast-top toast-end" hidden={!toastActive}>
  <div class="alert alert-error">
    <span class="font-medium">NIM atau Tanggal tidak sesuai</span>
  </div>
</div>

<div class="w-screen h-screen flex justify-center items-center">
    <form method="POST">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend class="fieldset-legend">Login</legend>
    
            <label for="absen" class="label">Nomor Absen</label>
            <input name="absen" type="number" class="input" placeholder="contoh: 10" max="86" min="1" bind:value={absen} required />
    
            <label for="tgllahir" class="label">Tanggal Lahir</label>
            <input name="tgllahir" type="date" class="input" placeholder="Tanggal Lahir" required />
            
            <label class="label">
                <input type="checkbox" checked="checked" class="checkbox" />
                Remember me
            </label>

            <button class="btn btn-primary mt-4">Login</button>
        </fieldset>
    </form>
</div>