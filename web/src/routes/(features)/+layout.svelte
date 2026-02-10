<script>
    import { onMount } from "svelte";
    import BackNavbar from "$lib/BackNavbar.svelte";
    import { checkAuth } from "$lib/utils/api";

    let isAuth = $state(false);

    onMount(() => {
        checkAuth().then((res) => {
            isAuth = res;
            if (!res) {
                window.location.href = "/login";
            }
        });
    });

    let { children } = $props();
</script>

{#if isAuth}
    <div class="flex flex-col h-full">
        <BackNavbar />
        <main class="grow overflow-auto">
            {@render children()}
        </main>
    </div>
{/if}
