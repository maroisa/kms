<script>
    import button from "daisyui/components/button";
    import { onMount } from "svelte";

    import LogoutPopup from "$lib/LogoutPopup.svelte";
    import { checkAuth, get } from "$lib/utils/api";
    import { PUBLIC_API_URL } from "$env/static/public";

    let data = $state({});

    let popupActive = $state(false);

    onMount(async () => {
        get("user").then((res) => {
            data = res;
        });
    });

    function togglePopupActive() {
        popupActive = !popupActive;
    }
</script>

<LogoutPopup active={popupActive} toggleActive={togglePopupActive} />

<div class="h-full flex justify-center items-center p-2">
    <div
        class="p-6 flex flex-col grow max-w-2xl sm:mx-auto sm:min-w-xl gap-8 bg-base-100 rounded-lg border-2 border-white/10"
    >
        <div class="mx-auto grow flex items-center">
            <div class="avatar">
                <div class="w-40 rounded-full">
                    {#if data.Pfp}
                        <img
                            src="{PUBLIC_API_URL}uploads/pfp/{data.Pfp}"
                            alt=""
                        />
                    {:else}
                        <div class="skeleton rounded-full h-full"></div>
                    {/if}
                    <input
                        type="file"
                        class="hidden"
                        accept="image/png, image/jpeg"
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center grow">
            <div
                class="flex bg-base-200 p-4 border border-neutral first:rounded-t-lg last:rounded-b-lg"
            >
                <p class="flex-1 text-base-content/80">NIM</p>
                <p class="font-semibold">{data.Nim}</p>
            </div>
            <div
                class="flex bg-base-200 p-4 border border-neutral first:rounded-t-lg last:rounded-b-lg"
            >
                <p class="flex-1 text-base-content/80">Nama</p>
                <p class="font-semibold">{data.Nama}</p>
            </div>
            <div
                class="flex bg-base-200 p-4 border border-neutral first:rounded-t-lg last:rounded-b-lg"
            >
                <p class="flex-1 text-base-content/80">Tempat</p>
                <p class="font-semibold">{data.TempatLahir}</p>
            </div>
            <div
                class="flex bg-base-200 p-4 border border-neutral first:rounded-t-lg last:rounded-b-lg"
            >
                <p class="flex-1 text-base-content/80">Tanggal Lahir:</p>
                <p class="font-semibold tgl-lahir">{data.TanggalLahir}</p>
            </div>
        </div>
        <button
            onclick={() => togglePopupActive()}
            class="btn text-error btn-ghost w-fit ml-auto mt-4">Logout</button
        >
    </div>
</div>
