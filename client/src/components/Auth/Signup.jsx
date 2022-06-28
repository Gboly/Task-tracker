import { useRef, useReducer, useCallback } from "react"
import Nav from "./Nav"
import "./signup.css"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { reducer, initialState } from "./reducers/signupReducer";



export default function Signup({mqy}){
    const [details, dispatch] = useReducer(reducer, initialState)    
    const { user:{username, email, password, cPassword}, userExistsError, passMatch, passVisibility: {pv, cpv}, logging } = details;    

    const focusRef = useRef();
    const navigate = useNavigate()
    
    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        dispatch({type: "logging in"})
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
                    navigate(`/main/${name}`)
                    dispatch({type: "done logging"})
                } else{
                    //Alert the user of error based on their error names
                    //Most likely "user already exists"
                    if(err.name === "UserExistsError"){
                        dispatch({type: "userExistsError"})                      
                        focusRef.current.focus();
                    }
                }
            })
            .catch(e=>console.log(e))            
        }
        else{
            dispatch({type: "passMatch"})
        }
    }, [password, cPassword, email, username, navigate])
    
   
    return (
        <div className="signup1">
            {!mqy && <Nav />}
            <div id="content"><h3 id="signup-h3" >Sign up</h3>            
                <form id="form" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="username">
                        <label htmlFor="username">Username:</label>
                        <input 
                            className="input"
                            type="text"
                            onChange={(e)=>dispatch({type: "handleChange", name: "username", value: e.target.value})}
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
                            onChange={(e)=>dispatch({type: "handleChange", name: "email", value: e.target.value})} 
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
                            type={pv ? "text" : "password"}
                            onChange={e=>dispatch({type: "handleChange", name: "password", value: e.target.value})} 
                            value={password}
                            id="password"
                            required
                        />
                        <i style={{cursor: "pointer"}} onClick={()=>dispatch({type: "passVisibility", name: "pv"})}><VisibilityIcon color="gray" fontSize="inherit" /></i>
                    </div>
                    <div className="password">
                        <label htmlFor="Cpassword">Confirm password:</label> 
                        <input 
                            className="input"
                            type={cpv ? "text" : "password"}
                            onChange={e=>dispatch({type: "handleChange", name: "cPassword", value: e.target.value})} 
                            value={cPassword}
                            id="Cpassword"
                            required
                        />
                        <i style={{cursor: "pointer"}} onClick={()=>dispatch({type: "passVisibility", name: "cpv"})}><VisibilityIcon color="gray" fontSize="inherit" /></i>                        
                    </div>
                    {!passMatch && <p className="p1">*Passwords do not match</p> }
                    {userExistsError && <p className="p1">*Email already exist</p>}
                    <button id="button" type="submit">
                        {logging ? "Submitting..." : "Submit"}
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