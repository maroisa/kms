<script>
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import { checkAuth } from "$lib/utils/api";
    import { goto } from "$app/navigation";

    onMount(() => {
        checkAuth().then((res) => {
            if (res) {
                goto("/dashboard");
                return;
            }
            goto("/login");
        });
    });
</script>
