import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { checkAuthorized } from "../../lib/api.js";

export default function LoggedLayout({ children }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = createSignal(true);

    checkAuthorized().then((isAuthorized) => {
        if (!isAuthorized) {
            navigate("/", { replace: true });
            return;
        }

        setIsLoading(false);
    }).catch((err) => {
        console.log(err);
        navigate("/500", { replace: true });
    });

    return (
        <Show when={!isLoading()}>
            {children}
        </Show>
    );
}
