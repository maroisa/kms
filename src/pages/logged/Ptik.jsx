import { A } from "@solidjs/router";
import { For } from "solid-js";

import { getPtik } from "../../lib/api";
import { formatDate } from "../../lib/utils";
import { allPtik, setAllPtik } from "./LoggedLayout";

export default function Ptik(){
    if (!allPtik.length){

        getPtik().then(res => {
            if (res.status != 200) return
            res.json().then(json => {
                setAllPtik(json)
            })
        })
    }
    



    return <>
        <div class="navbar bg-neutral shadow-lg/25">
        <A href="/dashboard" class="btn btn-ghost text-xl h-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back
        </A>
        </div>

        <div class="overflow-x-auto">
        <table class="table">
            <thead>
                <tr>
                    <th>NIM</th>
                    <th>Nama</th>
                    <th>Tempat, Tanggal Lahir</th>
                </tr>
            </thead>
            <tbody>
                <For each={allPtik}>
                    {(item, index) => (
                        <tr>
                            <td>K35240{item.nim.toString().padStart(2, '0')}</td>
                            <td>{item.nama}</td>
                            <td>{item.tempat_lahir + ', ' + formatDate(item.tanggal_lahir)}</td>
                        </tr>
                    )}
                </For>
            </tbody>
        </table>
        </div>
    </>
}