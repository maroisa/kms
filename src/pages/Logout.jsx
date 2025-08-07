import { useNavigate } from "@solidjs/router";
import { logout } from "../lib/api";

export default function Logout(){
    const navigate = useNavigate()

    logout().then(res => {
        navigate("/", {replace: true})
    })

    return null
}