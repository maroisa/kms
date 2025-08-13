import { A } from "@solidjs/router";

export default function NotFound404() {
    return (
        <div class="text-center content-center h-screen">
            <h1 class="text-4xl font-bold">404</h1>
            <p class="my-4">Page Not Found :(</p>
            <A href="/" class="link">Back to Home Page</A>
        </div>
    );
}
