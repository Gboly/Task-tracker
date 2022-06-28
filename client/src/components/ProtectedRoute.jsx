import {useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


export default function ProtectedRoute({children, mqy}){

    const [isAuth, setIsAuth] = useState(false)
    
    const navigate = useNavigate()
    const location = useLocation()
    
    useEffect(()=>{
        fetch("/auth/local/check",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({location: location.pathname}),
            credentials: "include"
        })
        .then(res=>res.json())
        .then(result=> result 
            ? setIsAuth(true)
            : navigate(mqy ? "/" : "/login")
            )
        .catch(e=>console.log(e))
    },[navigate, setIsAuth, location, mqy])

    return <>
        {isAuth && children }
    </>
}

