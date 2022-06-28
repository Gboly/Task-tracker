import React,{StrictMode} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import App from "./components/App"
// import Home from "./components/Auth/Home"
// import Signup from "./components/Auth/Signup";
// import Login from "./components/Auth/Login";
// import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./main";


    
    

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <BrowserRouter>
           <Main bodyNode={document.body} />
        </BrowserRouter>
    </StrictMode>
)
