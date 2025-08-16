import { For } from "solid-js";

export default function SubmissionSkeleton(){
    return <For each={[...Array(4).keys()]}>
        {(item) => <>
            <div class="flex w-full flex-col gap-4">
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-40 w-full"></div>
                <div class="flex gap-2 mb-4">
                    <div class="skeleton h-4 w-full"></div>
                    <div class="skeleton h-4 w-full"></div>
                </div>
            </div>
        </>}
    </For>
}