export default function ProfileItem(props){
    return <>
        <div class="flex gap-4 bg-base-200 p-3 border-1">
            <p class="flex-1 font-semibold">{props.name}</p>
            <p class="">:</p>
            <p class="flex-2">{props.value}</p>
        </div>
    </>
}