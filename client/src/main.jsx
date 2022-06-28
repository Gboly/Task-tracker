import App from "./components/App"
import Home from "./components/Auth/Home"
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Nopage from "./components/Auth/Nopage";


export default function Main({bodyNode}){
    const [mqy, setMqy] = useState(false)

    const handleMqy = useCallback((e)=>{
        setMqy(e.matches)
    },[])

    useEffect(()=>{
        const mediaQuery = window.matchMedia("(min-width: 958px");      
        handleMqy(mediaQuery);
        mediaQuery.addEventListener("change", handleMqy)
    },[handleMqy])


    return <Routes>
    <Route path="/" element={<Home mqy={mqy} />} >
        {mqy && <Route index element={<Login mqy={mqy} />} />}
        {mqy && <Route path="/signup" element={<Signup mqy={mqy} />} />}
    </Route>
    {!mqy && <Route path="/signup" element={<Signup />} />}
    {!mqy && <Route path="/login" element={<Login />} />}
    <Route path="/main/:user" element={<ProtectedRoute mqy={mqy}><App bodyNode={bodyNode} /></ProtectedRoute>} />
    <Route path="*" element={<Nopage />} />
</Routes>
}