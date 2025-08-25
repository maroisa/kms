import { createSignal, For, lazy } from "solid-js"
import {jadwal, sesi} from "../../lib/jadwal.js"
import { getUser } from "../../lib/api.js"

import BackNavbar from "../../components/BackNavbar.jsx"

export default function Jadwal(){
    const nim = localStorage.getItem("nim")

    if (!nim) {
        const res = getUser().then(res => {
            if (!res.ok) return
            res.json().then(json => {
                localStorage.setItem("nim", json.nim)
            })
        })
    }

    const isEven = nim % 2 == 0
    const [currentJadwal, setCurrentJadwal] = createSignal(isEven ? jadwal.B : jadwal.A)

    return <div class="flex flex-col">
        <BackNavbar title="Jadwal" />

        <div class="flex gap-4 p-4">
            <select class="select flex-1 bg-base-200" onchange={(e) => {
                const pilihan = e.target.value
                setCurrentJadwal(jadwal[pilihan])
            }}>
                <option value="A">Kelas: A</option>
                <option value="B" selected={isEven}>Kelas: B</option>
            </select>
        </div>

        <div class="p-2 overflow-auto">
            <table class="table w-full min-w-max border border-neutral">
                <thead>
                    <tr class="bg-neutral">
                        <th>Sesi</th>
                        <th>Jam</th>
                        <For each={Object.keys(currentJadwal())}>
                            {item => <th>{item}</th>}
                        </For>
                    </tr>
                </thead>
                <tbody>
                    <For each={Object.keys(sesi)}>
                        {s => <>
                            <tr>
                                <td class="min-w-max max-w-0 w-max">{Number(s) + 1}</td>
                                <td>{sesi[s]}</td>
                                <For each={Object.keys(currentJadwal())}>
                                    {hari => <>
                                        <td>{currentJadwal()[hari][s]}</td>
                                    </>}
                                </For>
                            </tr>
                        </>}
                    </For>
                </tbody>
            </table>
        </div>
    </div>
}
