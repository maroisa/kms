<script>
    import BackNavbar from "$lib/BackNavbar.svelte";

    let { children } = $props();
</script>

<div class="flex flex-col h-full">
    <BackNavbar />
    <main class="grow overflow-auto">
        {@render children()}
    </main>
</div>
