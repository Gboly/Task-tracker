import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ProtectedRoute({children}){

    const [isAuth, setIsAuth] = useState(false)
    
    const navigate = useNavigate()    

    useEffect(()=>{
        fetch("/auth/local/check",{
            credentials: "include"
        })
        .then(res=>res.json())
        .then(result=> result 
            ? setIsAuth(true)
            : navigate("/")
            )
        .catch(e=>console.log(e))
    },[navigate, setIsAuth])

    return <>
        {isAuth && children }
    </>
}

