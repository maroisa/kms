<script>
    import { post } from "$lib/utils/api";

    function logout() {
        post("logout", null).then((res) => {
            if (res.status >= 400) {
                toggleActive();
                return;
            }

            window.location.href = "/login";
        });
    }
    let { active, toggleActive } = $props();
</script>

<div
    class={`transition-all duration-100 absolute top-0 left-0 size-full bg-base-300/50 flex justify-center items-center z-5 ${active ? "opacity-100 visible" : "opacity-0 invisible"}`}
>
    <div
        class={`transition-all duration-100 card bg-base-100 text-neutral-content w-96 ${active ? "scale-100" : "scale-90"}`}
    >
        <div class="card-body items-center text-center">
            <h2 class="card-title">Apakah anda ingin Log Out?</h2>
            <div class="card-actions justify-end">
                <button onclick={logout} class="btn btn-error btn-outline"
                    >Ya</button
                >
                <button
                    onclick={() => toggleActive()}
                    class="btn btn-default btn-outline">Cancel</button
                >
            </div>
        </div>
    </div>
</div>
