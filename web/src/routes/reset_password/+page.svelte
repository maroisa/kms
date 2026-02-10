<script>
    import { post } from "$lib/utils/api";

    let nim = $state("");
    let password = $state("");

    function handleForm(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        post("reset_password", formData).then((res) => {
            if (res.status >= 400) {
                return;
            }

            post("login", formData).then((res) => {
                if (res.status >= 400) {
                    return;
                }
                window.location.href = "/dashboard";
            });
        });
    }
</script>

<main class="flex items-center justify-center">
    <form method="POST" onsubmit={handleForm}>
        <fieldset
            class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        >
            <legend class="fieldset-legend">Reset Password</legend>

            <label for="nim" class="label">NIM</label>
            <input
                name="nim"
                type="text"
                class="input"
                placeholder="K3520067"
                required
            />

            <label for="tanggal_lahir" class="mt-2 label">Tanggal Lahir</label>
            <input name="tanggal_lahir" type="date" class="input" required />

            <label for="password" class="mt-2 label">Password</label>
            <input
                name="password"
                type="password"
                class="input"
                placeholder="admin123"
                required
            />

            <a href="/login" class="mt-2 label">
                Ingat password? <u>Login</u>
            </a>

            <button type="submit" class="btn btn-secondary mt-4">Login</button>
        </fieldset>
    </form>
</main>
