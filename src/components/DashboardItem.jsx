import { A } from "@solidjs/router";

export default function DashboardItem({href, children, name}){
    return <A href={href} class="btn btn-outline btn-primary flex flex-col justify-center items-center min-h-28 md:min-h-40" preload>
        {children}
        <p class="font-bold mt-2 text-xs sm:text-base">{name}</p>
    </A>
}