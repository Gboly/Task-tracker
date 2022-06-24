import passport from "passport"
import User from "../Models/User.js"
import dotenv from "dotenv"
import Google from "passport-google-oauth20"
import Facebook from "passport-facebook"

dotenv.config()
const GoogleStrategy = Google.Strategy
const FacebookStrategy = Facebook.Strategy;

 
///generating session id///
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


