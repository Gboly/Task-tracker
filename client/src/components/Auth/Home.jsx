import Nav from "./Nav";
import "./home.css"
import {Link} from "react-router-dom"

export default function Home(){


    return <div className="home-container">
        <Nav />
        <div id='home-content'>
        <p id='brand-name'>Task racker</p>    
        <p id='brand-story'>Having all your tasks in one place makes getting the job done easier.</p>
        <div id="home-button-container"><Link to={`/signup`} style={{textDecoration: "none"}} ><button className="home-button">Sign up</button></Link>
        <Link to={`/login`} style={{textDecoration: "none"}} > <button className="home-button login-button">Login</button></Link></div> 
        </div>
    </div>
}

// {currentMode
//     ? <NightlightRoundIcon fontSize="inherit" color="inherit" />
//     : <LightModeIcon fontSize="inherit" color="inherit" />
//     }