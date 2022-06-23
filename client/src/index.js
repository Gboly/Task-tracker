import React,{StrictMode} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App"
import Home from "./components/Auth/Home"
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";


    
    

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/main/:user" element={<ProtectedRoute><App bodyNode={document.querySelector("#root").parentNode} /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)

//<App bodyNode={document.querySelector("#root").parentNode} />

// <BrowserRouter>
// <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/signup" element={<Signup />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/main" element={<App />} />
// </Routes>
// </BrowserRouter>