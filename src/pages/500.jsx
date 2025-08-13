import { A } from "@solidjs/router";

export default function InternalError500() {
    return (
        <div class="text-center content-center h-screen">
            <h1 class="text-4xl font-bold">500</h1>
            <p class="my-4">Internal Server Error :(</p>
            <A href="/" class="link">Refresh</A>
        </div>
    );
}
