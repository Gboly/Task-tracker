import Nav from "./Nav";
import "./home.css"
import {Link, Outlet} from "react-router-dom"
import { useState } from "react";

export default function Home({mqy}){
    const [switchPage, setSwitchPage] = useState(false)

    function handleClick(){
        mqy && setSwitchPage(!switchPage)
    }

    return <div className="home-container">
        <Nav />
        <div className={mqy ? "mqy-home-container" : ""}>
        <div id='home-content'>
        <p id='brand-name'>Task racker</p>
        <p id='brand-story'>Having all your tasks in one place makes getting the job done easier.</p>
        <div id="home-button-container"><Link to={switchPage ? "/" :`/signup`} style={{textDecoration: "none"}} ><button onClick={handleClick} className="home-button">{switchPage ? "Log in" :"Sign up"}</button></Link>
        {!mqy && <Link to={`/login`} style={{textDecoration: "none"}} > <button className="home-button login-button">Login</button></Link>}</div>
        </div>        
        {mqy && <Outlet />}
        </div>
    </div>
}

// {currentMode
//     ? <NightlightRoundIcon fontSize="inherit" color="inherit" />
//     : <LightModeIcon fontSize="inherit" color="inherit" />
//     }