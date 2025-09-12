import { useNavigate } from "@solidjs/router";
import { postLogout } from "../lib/api";

export default function Logout(){
    const navigate = useNavigate()

    postLogout().then(res => {
        localStorage.removeItem("nim")
        navigate("/", {replace: true})
    })

    return null
}