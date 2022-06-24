import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    user_Id: {type: mongoose.Schema.Types.ObjectId, ref: "userSchema", strict: true},
    clicked: Boolean,
    text: String
})

const Task = mongoose.model("Task", taskSchema)

export default Task;