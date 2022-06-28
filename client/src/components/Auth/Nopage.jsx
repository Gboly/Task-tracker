import { useNavigate } from "react-router-dom"
import login from "../../srcImages/key.png"
import backArrow from "../../srcImages/back-arrow.png"
import home from "../../srcImages/home(2).png"
import signup from "../../srcImages/signup.png"
import "./nopage.css"
import { useState } from "react"



const descriptions = ["Back", "Login", "Sign up", "Home"]
export default function Nopage(){
    
    const [visible, setVisible] = useState()

    const navigate = useNavigate()
    
    const events= {
            onMouseOver: handleMouseOver,
            onMouseOut: handleMouseOut,
            onTouchStart: handleMouseOver,
            onTouchEnd: handleMouseOut,
            onClick: handleClick
        }
    
    function handleClick(e){
        const name = e.target.name
        name==="BacK" 
        ? navigate(-1)
        : name==="Login"
        ? navigate("/login")
        : name==="Sign up"
        ? navigate("/signup")
        : navigate("/")        
    }
    function handleMouseOver(e){
        const name = e.target.name;
        setVisible(name)        
    }
    function handleMouseOut(e){
        setVisible("")        
    }

    return <>
        <nav className="navbar navbar-light justify-content-between nav404">
            <div className="brand-logo"><div>T</div></div>            
        </nav>
        <div className="container404">                 
            <div className="flexContainer404">
                <div className="contentContainer404">
                    <h1 className="h1404">404</h1>
                    <p className="h2404">
                        Your tasks are not here.
                    </p>
                    <p className="p404">
                        No need to fret though. Doesn't exactly mean you're lost.
                    </p>
                    <p className="description404">
                        {descriptions.map(
                            (description, index) =>
                                <span key={index} style={{visibility: visible===description ? "visible" : "hidden"}} >
                                    {description}
                                </span>
                            )
                        }
                    </p>          
                    <div className="div-btn404" >
                    <button name="Back" className="button404" {...events} >
                        <img name="Back" src={backArrow} alt="back button" />
                    </button>
                    <button name="Login" className="button404" {...events} >
                        <img name="Login" src={login} alt="login button" />
                    </button>
                    <button name="Sign up" className="button404" {...events} >
                        <img name="Sign up" src={signup} alt="sign up button" />
                    </button>
                    <button name="Home" className="button404" {...events}   >
                        <img name="Home" src={home} alt="home button" />
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}