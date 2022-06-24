import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"
import findOrCreate from "mongoose-findorcreate"

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    displayName: String,
    googleId: String,
    faceboookId: String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)

const User = mongoose.model("User", userSchema)

export default User;