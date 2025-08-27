import { createResource, For, Suspense } from "solid-js";

import ptik from "../../data/ptik.js";
import { formatDate } from "../../lib/utils";
import PtikTableSkeleton from "../../components/PtikTableSkeleton";

import BackNavbar from "../../components/BackNavbar.jsx"

export default function Ptik(){
    localStorage.removeItem("ptik")

    return <>
        <BackNavbar title="Mahasiswa PTIK" />
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
                <Suspense fallback={PtikTableSkeleton}>
                    <For each={ptik}>
                        {(item, index) => (
                            <tr>
                                <td>K35240{item.nim.toString().padStart(2, '0')}</td>
                                <td>{item.nama}</td>
                                <td>{item.tempat_lahir + ', ' + formatDate(item.tanggal_lahir)}</td>
                            </tr>
                        )}
                    </For>
                </Suspense>
            </tbody>
        </table>
        </div>
    </>
}