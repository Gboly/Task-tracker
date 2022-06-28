import passport from "passport"
import User from "../../Models/User.js"

const signup = (req, res)=>{
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
}

const login = (req, res, next)=>{
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
}

const logout = (req,res)=>{
    req.logOut(err=> err ? res.send({error: {...err}}) : res.send({error: ""}));    
}

const check = (req, res)=>{    
    const pathname =  req.body.location;
    const path = pathname.replace(/%20/g, " ")
    if(req.user){        
         res.send(path === `/main/${req.user.displayName}` ? req.isAuthenticated() : false)         
    } else{
        res.send(false)
    }
}


export {signup, login, logout, check}