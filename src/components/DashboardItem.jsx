import { A } from "@solidjs/router";

export default function DashboardItem(props){
    return <A href={props.href} class="btn btn-outline btn-primary flex flex-col justify-center items-center min-h-28">
        {props.children}
        <p class="font-bold mt-2 text-xs sm:text-base">{props.name}</p>
    </A>
}