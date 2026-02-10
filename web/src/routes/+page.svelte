<script>
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import { checkAuth } from "$lib/utils/api";

    onMount(() => {
        checkAuth().then((res) => {
            if (res) {
                window.location.href = "/dashboard";
                return;
            }
            window.location.href = "/login";
        });
    });
</script>
