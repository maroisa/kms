import { Show } from "solid-js"
import { postSubmissionScore } from "../lib/api";

export default function SubmissionItem({item, refetch}){
    let profileImage

    function onVote(){
        if (item.voted) return
        postSubmissionScore(item.id).then(res => {
            refetch()
        })
    }
    
    const profileLoading = setInterval(() => {
        if (item.pfp.slice(0,4) == "blob"){
            profileImage.src = item.pfp
            clearInterval(profileLoading)
        }
    }, 1000);

    return <div class="card bg-base-100 max-w-lg shadow-lg/20 border border-white/10">
        <div class="flex gap-2 px-4 py-2">
            <div class="avatar">
                <div class="w-8 rounded-full">
                    <img src={item.pfp} ref={profileImage} />
                </div>
            </div>
            <h2 class="card-title text-sm">{item.nama}</h2>
        </div>
        <figure>
            <img
            class="aspect-square object-cover size-full"
            src={`/api/uploads/submission/${item?.img}`}
            alt="Gambar Submisi" />
        </figure>
        <div class="px-4 py-2 flex items-center">
            <button class="aspect-square btn btn-ghost p-0 active:scale-120 transition-all" onclick={onVote}>
                <Show when={item.voted} fallback={<ArrowUp />}>
                    <ArrowUpSolid />
                </Show>
            </button>
            <span>{item.votes} {item.votes <= 1 ? "Vote" : "Votes"}</span>
        </div>
    </div>
}


function ArrowUp(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
}

function ArrowUpSolid(){
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
    </svg>
  
}