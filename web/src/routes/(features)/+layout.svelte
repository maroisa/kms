<script>
    import { onMount } from "svelte";
    import BackNavbar from "$lib/BackNavbar.svelte";
    import { checkAuth } from "$lib/utils/api";
    import { goto } from "$app/navigation";

    let isAuth = $state(false);

    onMount(() => {
        checkAuth().then((res) => {
            isAuth = res;
            if (!res) {
                goto("/login");
                return;
            }
        });
    });

    let { children } = $props();
</script>

{#if isAuth}
    <div class="flex flex-col h-full">
        <BackNavbar />
        <main class="grow overflow-auto bg-base-200">
            {@render children()}
        </main>
    </div>
{/if}
