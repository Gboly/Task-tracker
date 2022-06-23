import { useState } from "react"
import Nav from "./Nav"
import "./signup.css"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";


export default function Login(){
    const [user, setUser] = useState({email: "", password: ""});
    const {email, password} = user;
    //const [passMatch, setPassMatch] = useState(true)
    const [passVisibility, setPassVisibility] = useState(false)
    const [authPass, setAuthPass] = useState(true)

    const navigate = useNavigate()
    

    function handleChange(e, name){
        setAuthPass(true)    
        const value = e.target.value;
        setUser({...user, [name]: value})
    }
    function handleSubmit(e){
        e.preventDefault();
        fetch("/auth/local/login",{
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({username: email, password}),
            credentials: "include"
        })
        .then(res=>res.json())
        .then(({isAuthenticated, name})=>{
            if(isAuthenticated){
                console.log(name)                
                navigate(`/main/${name}`)                
            } else{
                setUser({email: "", password: ""})
                setAuthPass(false)
            }
        })
    }
    function handlePassVisibility(name){       
        setPassVisibility(pv=> !pv)
    }
    function googleAuth(){
        window.location.replace("http://localhost:5000/auth/google")
    }
    function facebookAuth(){
    //facebook
    window.location.replace("http://localhost:5000/auth/facebook")
    }

    return (
        <div className="signup1">
            <Nav />
            <div id="content"><h3 id="h3" style={{marginBottom: "6vh"}}>Login</h3>            
                <form onSubmit={(e)=>handleSubmit(e)} id="form" >
                    <div className="username">
                        <label htmlFor="email">Email:</label>
                        <input
                            className="input"
                            type="email"
                            onChange={(e)=>handleChange(e, "email")}
                            value={email} 
                            id="email"
                            required
                            autoComplete="off"
                        />
                    </div>                
                    <div className="password">
                        <label htmlFor="password">Password:</label> 
                        <input 
                            className="input"
                            type={passVisibility ? "text" : "password"}
                            onChange={(e)=>{handleChange(e, "password")}} 
                            value={password}
                            id="password"
                            required
                        />
                        <i style={{cursor: "pointer"}} onClick={()=>handlePassVisibility("pv")}><VisibilityIcon color="gray" fontSize="inherit" /></i>
                    </div>
                    {!authPass && <p className="p1">*Incorrect email or password</p>}                
                    <button id="button" type="submit" style={{margin: "1.2vh auto 3vh"}}>
                        Login
                    </button>
                </form>
                <p id="p2">or login with</p>
                <div id="icons">
                    <i style={{cursor: "pointer"}} onClick={facebookAuth}><FacebookIcon color="inherit" fontSize="inherit" /></i>
                    <i style={{cursor: "pointer"}} onClick={googleAuth}><GoogleIcon color="inherit" fontSize="inherit" /></i>
                </div>
            </div>
        </div>  
    )
}