import { Navigate } from "react-router-dom"
import { logout } from "../lib/utils";
import { useState } from "react";
export default function Logout(){
    const [ready , set_ready] = useState(false);
    logout().then(()=>set_ready(true));
    return (
    <>
    {ready===true?<Navigate to={"/"}></Navigate>:""}
    </>)
}