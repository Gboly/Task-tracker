import { useReducer, useCallback } from "react"
import Nav from "./Nav"
import "./signup.css"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import {reducer, initialState} from "./reducers/loginReducer";



export default function Login({mqy}){
    const [details, dispatch] = useReducer(reducer, initialState) 
    const {user:{email, password}, passVisibility, authPass, logging} = details;    
    
    const navigate = useNavigate()
    
    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        dispatch({type: "logging in"})
        fetch("/auth/local/login",{
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({username: email, password}),
            credentials: "include"
        })
        .then(res=>res.json())
        .then(({isAuthenticated, name})=>{
            if(isAuthenticated){                                
                navigate(`/main/${name}`)
                dispatch({type: "done logging"})              
            } else{
                dispatch({type: "wrongPass"})                
            }
        })
    },[email, navigate, password])
    
    return (
        <div className="signup1">
            {!mqy && <Nav />}
            <div id="content"><h3 id="h3" style={{marginBottom: "6vh"}}>Login</h3>            
                <form onSubmit={(e)=>handleSubmit(e)} id="form" >
                    <div className="username login-div">
                        <label htmlFor="email">Email:</label>
                        <input
                            className="input"
                            type="email"
                            onChange={(e)=>dispatch({type: "handleChange", name: "email", value: e.target.value}) }
                            value={email} 
                            id="email"
                            required
                            autoComplete="off"
                        />
                    </div>                
                    <div className="password login-div">
                        <label htmlFor="password">Password:</label> 
                        <input 
                            className="input"
                            type={passVisibility ? "text" : "password"}
                            onChange={(e)=>dispatch({type: "handleChange", name: "password", value: e.target.value}) }
                            value={password}
                            id="password"
                            required
                        />
                        <i style={{cursor: "pointer"}} onClick={()=>dispatch({type: "handlePassVisibility"})}><VisibilityIcon color="gray" fontSize="inherit" /></i>
                    </div>
                    {!authPass && <p className="p1">*Incorrect email or password</p>}                
                    <button id="button" type="submit" style={{margin: "1.2vh auto 3vh"}}>
                    {logging ? "Logging..." : "Login"}
                    </button>
                </form>
                <p id="p2">or login with</p>
                <div id="icons">
                        <i style={{cursor: "pointer"}} >
                            <a href="http://localhost:5000/auth/facebook" target={"_parent"} rel={"nofollow noreferrer"} >
                            <FacebookIcon color="inherit" fontSize="inherit" />
                            </a>
                        </i>
                    
                    
                        <i style={{cursor: "pointer"}} >
                        <a href="http://localhost:5000/auth/google" target={"_parent"} rel={"nofollow noreferrer"} >
                            <GoogleIcon color="inherit" fontSize="inherit" />
                            </a>
                        </i>
                </div>
            </div>
        </div>  
    )
}