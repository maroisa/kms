import { useNavigate } from "@solidjs/router";
import { postLogout } from "../lib/api";

export default function Logout(){
    const navigate = useNavigate()

    postLogout().then(res => {
        navigate("/", {replace: true})
    })

    return null
}