import mongoose from "mongoose"

export default async function runDb(){
    await mongoose.connect("mongodb://localhost:27017/todoDB");
    console.log("connected to todoDB")
}