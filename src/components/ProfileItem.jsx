export default function ProfileItem(props){
    return <>
        <div class="flex bg-base-200 p-4 border-1 border-neutral first:rounded-t-lg last:rounded-b-lg">
            <p class="flex-1 text-base-content/80">{props.name}</p>
            <p class="font-semibold">{props.value}</p>
        </div>
    </>
}