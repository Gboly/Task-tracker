//regular packages//
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
//End of regular packages//

//Auth packages//
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const findOrCreate = require("mongoose-findorcreate")

//Google
const GoogleStrategy = require("passport-google-oauth20").Strategy

//Facebook
const FacebookStrategy = require("passport-facebook").Strategy;

////End of Auth packages/////

//Cross origin resource sharing////
const cors = require("cors");
//end of cors////


const app = express();

//middleware for all express routes//
app.use(express.static('public'));
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
//End of middleware////

///MongoDB local connection ////
//When using Atlas srv connection, do not use the name todoDB //////////////////////////////////////////
async function runDb(){
    await mongoose.connect("mongodb://localhost:27017/todoDB");
    console.log("connected to todoDB")
}
runDb().catch(e=>console.log(e));
//End of MongoDB local connection


//Schema & Model file
const schema = new mongoose.Schema({
    user_Id: {type: mongoose.Schema.Types.ObjectId, ref: "userSchema", strict: true},
    clicked: Boolean,
    text: String
})
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    displayName: String,
    googleId: String,
    faceboookId: String
})
    //connecting PLM to my database schema so that////
    //it can create a new document (i.e register new user) //// 
    //using this schema during sign up.////
    userSchema.plugin(passportLocalMongoose);

    //Also connecting findOrcreate to my DB schema
    userSchema.plugin(findOrCreate)

const Task = mongoose.model("Task", schema)
const User = mongoose.model("User", userSchema)
////End of Schema & model file///////


///passport middlewares///
passport.serializeUser((user, done)=> done(null, user.id))
passport.deserializeUser((id, done)=>{
    User.findById(id,(err, user)=> done(err, user))
})

//Local
passport.use(User.createStrategy());

//Google
passport.use(new GoogleStrategy({    
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/todo",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {        
        User.findOrCreate({ googleId: profile.id, username: profile.emails[0].value, displayName: profile.displayName }, function (err, user) {
          return done(err, user);
        });
    }    
))

//Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/task-tracker"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  })
)

//End of passport middlewares


///Auth Google routes////
app.get("/auth/google",passport.authenticate("google",{ scope: ["profile", "email"] }))

app.get("/auth/google/todo", passport.authenticate("google",{failureRedirect: "/login"}), (req, res)=>{    
    res.redirect(`http://localhost:3000/main/${req.user.displayName}`)
})
//End of Auth Google route

//Auth Facebook routes///
app.get("/auth/facebook", passport.authenticate("facebook",{ scope: ["displayName", "email"] }))

app.get("/auth/facebook/task-tracker", passport.authenticate("facebook",{failureRedirect: "/login"}), (req, res)=>{
    res.redirect(`http://localhost:3000/main/${req.user.displayName}`)
})
//End of auth facebook route


///Auth local route////
app.post("/auth/local/signup", (req, res)=>{
    User.register({username:req.body.username, displayName: req.body.displayName},req.body.password, (err, user)=>{   
        if(err){
            console.log(err)
            res.send({isAuthenticated: false, name: '', err:{...err}})
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.send({isAuthenticated: true, name: req.user.displayName, err:""})
            })
        }
    })
})

app.post("/auth/local/login",(req, res, next)=>{
    passport.authenticate("local",(err, user, info)=>{
        if (err) {
            return next(err);
        };
        if (!user) {               
            return res.send({isAuthenticated: false, name: ""})
        }
        req.login(user, function (err) {            
            return res.send({isAuthenticated: true, name: req.user.displayName});  
        })
    })(req, res, next)
})

app.get("/auth/local/logout", (req,res)=>{
    req.logOut(err=> err ? res.send({error: {...err}}) : res.send({error: ""}));
    
})

app.get("/auth/local/check", (req, res)=>{
    res.set(
        'Cache-Control',
        'no-cache, private, no-store, must-revalidate, max-stal e=0, post-check=0, pre-check=0'
    );    
    res.send(req.isAuthenticated());
})
/////End of Auth local route ////////////







////Todo main page routes
app.get("/home", async (req,res)=>{    
   const result = await Task.find()
   res.send(result);
})

app.post("/getFormInput", async (req,res)=>{
    const user = JSON.parse(JSON.stringify(req.user))
    const newTask = new Task({
        user_Id: user._id,
        clicked: false,
        text: req.body.task
    })
    await newTask.save()
    const result = await Task.find();  
     res.send(result);
})

app.patch("/updateCompleted", async (req,res)=>{   
    await Task.updateOne({_id: req.body.uid},{clicked: !req.body.clicked})
    const result = await Task.find();
    res.send(result)
})

app.delete("/delete", async (req,res)=>{  
    await Task.findOneAndDelete({_id: req.body.uid})
    const result = await Task.find();
    res.send(result)    
})

app.delete("/clearCompleted", async (req, res)=>{
    await Task.deleteMany({clicked: true})
    const result = await Task.find();
    res.json(result)
})

app.put("/refactor", (req,res)=>{
    const result = req.body.refactoredTasks;
    Task.deleteMany({})
    .then(()=>Task.insertMany(result))
    .then(()=>res.send())
    .catch(e=>console.log(e))
})
////End of Todo main page routes////


//Port//
app.listen(5000,()=>console.log("Started listening on port 5000"))
