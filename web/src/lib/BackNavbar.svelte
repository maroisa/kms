<script>
    import { goto } from "$app/navigation";
    import ArrowLeftIcon from "./icons/arrowLeft.svelte";
</script>

<header
    class="navbar shadow-lg border-b-2 border-b-primary text-primary z-3 bg-base-100"
>
    <button class="btn btn-ghost text-lg" onclick={() => goto("/dashboard")}>
        <ArrowLeftIcon />
        Back
    </button>
</header>
