import { For } from "solid-js";

export default function PtikTableSkeleton(){
    return <For each={[...Array(12).keys()]}>
        {item => {
            return <tr>
                <td class="h-12 p-2">
                    <div class="skeleton h-full"></div>
                </td>
                <td class="h-12 p-2">
                    <div class="skeleton h-full"></div>
                </td>
                <td class="h-12 p-2">
                    <div class="skeleton h-full"></div>
                </td>
            </tr>
        }}
    </For>
}