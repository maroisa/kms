<script>
    function handleForm() {
        alert("your mom");
    }
</script>

<main class="flex items-center justify-center">
    <form method="POST" onsubmit={handleForm}>
        <fieldset
            class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        >
            <legend class="fieldset-legend">Login</legend>

            <label for="nim" class="label">NIM</label>
            <input
                name="nim"
                type="text"
                class="input"
                placeholder="K3520067"
                required
            />

            <label for="password" class="label">Password</label>
            <input
                name="password"
                type="password"
                class="input"
                placeholder="admin123"
                required
            />

            <a href="/" class="mt-2 label">
                Lupa password? <u>Reset</u>
            </a>

            <button
                onclick={() => {
                    window.location.href = "/dashboard";
                }}
                type="submit"
                class="btn btn-primary mt-4">Login</button
            >
        </fieldset>
    </form>
</main>
