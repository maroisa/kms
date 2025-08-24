import { A } from "@solidjs/router";
import { createResource, For, Suspense, lazy } from "solid-js";

import { getPtik } from "../../lib/api";
import { formatDate } from "../../lib/utils";
import PtikTableSkeleton from "../../components/PtikTableSkeleton";

const BackNavbar = lazy(() => import("../../components/BackNavbar.jsx")) 

export default function Ptik(){
    const [ptik] = createResource(async () => {
        let data = localStorage.getItem("ptik")
        data = JSON.parse(data)
        if (data) return data
        
        const res = await getPtik()
        if (res.status != 200) return []
        
        const json = await res.json()
        localStorage.setItem("ptik", JSON.stringify(json))
        return json
    })


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
                    <For each={ptik()}>
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