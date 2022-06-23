import { useState, useRef } from "react"
import Nav from "./Nav"
import "./signup.css"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";



export default function Signup(){
    const [user, setUser] = useState({username: "", email: "", password: "", cPassword: "" });
    const { username, email, password, cPassword } = user;
    const [passMatch, setPassMatch] = useState(true)
    const [passVisibility, setPassVisibility] = useState({pv: false, cpv: false})
    const [UserExistsError, setUserExistsError] = useState(false);

    const focusRef = useRef();
    const navigate = useNavigate()

    function handleChange(e, name){
        setPassMatch(true)
        const value = e.target.value;
        setUser({...user, [name]: value})
    }
    function handleSubmit(e){
        e.preventDefault();
        if(password===cPassword){
            fetch("/auth/local/signup",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password, username: email, displayName: username}),
                credentials: "include"
            })
            .then(res=>res.json())
            .then(({isAuthenticated, name, err})=>{ 
                if(isAuthenticated){                    
                    //Navigate to /main
                    navigate(`/main/${name}`)
                } else{           
                    //Alert the user of error based on their error names
                    //Most likely "user already exists"
                    if(err.name === "UserExistsError"){
                        setUserExistsError(true);
                        setUser(old=>({...old, email: ""}))
                        focusRef.current.focus();
                    }                    
                }
             })
            .catch(e=>console.log(e))
        }
        else{
            setPassMatch(false)
        }
    }
    function handlePassVisibility(name){       
        setPassVisibility(({pv, cpv})=>(name==="pv" ? {pv:!pv, cpv:cpv} : {pv:pv, cpv:!cpv}))
    }
    function facebookAuth(){
        //windows.location.href
        window.location.replace("http://localhost:5000/auth/facebook")
    }
    function googleAuth(){
        window.location.replace("http://localhost:5000/auth/google")
    }

    return (
        <div className="signup1">
            <Nav />
            <div id="content"><h3 id="signup-h3" >Sign up</h3>            
                <form id="form" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="username">
                        <label htmlFor="username">Username:</label> 
                        <input 
                            className="input"
                            type="text"
                            onChange={(e)=>{handleChange(e, "username")}} 
                            value={username}
                            id="username"
                            required
                            autoComplete="off"                          
                        />                        
                    </div>                
                    <div>
                        <label htmlFor="Email">Email:</label> 
                        <input 
                            className="input"
                            type="email"
                            onChange={(e)=>{handleChange(e, "email")}} 
                            value={email}
                            id="Email"
                            required
                            ref={focusRef}
                            autoComplete="off"
                        />                        
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password:</label> 
                        <input 
                            className="input"
                            type={passVisibility.pv ? "text" : "password"}
                            onChange={(e)=>{handleChange(e, "password")}} 
                            value={password}
                            id="password"
                            required
                        />
                        <i style={{cursor: "pointer"}} onClick={(e)=>handlePassVisibility("pv")}><VisibilityIcon color="gray" fontSize="inherit" /></i>
                    </div>
                    <div className="password">
                        <label htmlFor="Cpassword">Confirm password:</label> 
                        <input 
                            className="input"
                            type={passVisibility.cpv ? "text" : "password"}
                            onChange={(e)=>{handleChange(e, "cPassword")}} 
                            value={cPassword}
                            id="Cpassword"
                            required
                        />
                        <i style={{cursor: "pointer"}} onClick={(e)=>handlePassVisibility("cpv")}><VisibilityIcon color="gray" fontSize="inherit" /></i>                        
                    </div>
                    {!passMatch && <p className="p1">*Passwords do not match</p> }
                    {UserExistsError && <p className="p1">*Email already exist</p>}
                    <button id="button" type="submit">
                        Submit
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