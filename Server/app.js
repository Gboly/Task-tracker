//regular packages//
import express from "express"
import dotenv from "dotenv"

//Auth packages//
import passport from "passport"
import session from "express-session"

//Cross origin resource sharing////
import cors from "cors"

//Routes
import todoRoute from "./Routes/Todo/todoRoute.js"
import localAuthRoute from "./Routes/Auth/localAuthRoute.js"
import googleAuthRoute from "./Routes/Auth/googleAuthRoute.js"
import facebookAuthRoute from "./Routes/Auth/facebookAuthRoute.js";

//DB
import runDb from "./Config/db.config.js"

const app = express();
dotenv.config()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

app.use(passport.initialize());
app.use(passport.session())

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}))

runDb().catch(e=>console.log(e));

import "./Config/Passport.config.js";

app.use("/auth/local", localAuthRoute);
app.use("/auth/google", googleAuthRoute);
app.use("/auth/facebook", facebookAuthRoute)
app.use("/todo", todoRoute)

app.listen(5000,()=>console.log("Started listening on port 5000"))
