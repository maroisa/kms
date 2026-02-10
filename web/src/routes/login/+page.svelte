<script>
    import { post } from "$lib/utils/api";
    import { redirect } from "@sveltejs/kit";

    let nim = $state("");
    let password = $state("");

    let popupActive = $state(false);

    let popupTimeout = setTimeout(() => {}, 0);

    function handleForm(event) {
        event.preventDefault();
        let data = new FormData(event.target);
        post("login", data).then((res) => {
            if (res.status >= 400) {
                clearTimeout(popupTimeout);
                popupActive = true;
                popupTimeout = setTimeout(() => {
                    popupActive = false;
                }, 3000);
                return;
            }
            window.location.href = "/dashboard";
        });
    }
</script>

<div class="toast" hidden={!popupActive}>
    <div class="alert alert-error">
        <span>Username atau password salah!</span>
    </div>
</div>

<main class="flex items-center justify-center">
    <form method="POST" onsubmit={handleForm}>
        <fieldset
            class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        >
            <legend class="fieldset-legend">Login</legend>

            <label for="nim" class="label">NIM</label>
            <input
                bind:value={nim}
                name="nim"
                type="text"
                class="input"
                placeholder="K3520067"
                required
            />

            <input
                bind:value={password}
                name="password"
                type="password"
                class="input"
                placeholder="admin123"
                required
            />

            <a href="/reset_password" class="mt-2 label">
                Lupa password? <u>Reset</u>
            </a>

            <button type="submit" class="btn btn-primary mt-4">Login</button>
        </fieldset>
    </form>
</main>
