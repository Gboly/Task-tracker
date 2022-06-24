import Task from "../../Models/Task.js"

const home = async (req, res)=>{
    const result = await Task.find({user_Id: req.user._id})
   res.send(result);
}

const getFormInput = async (req,res)=>{
    const user = JSON.parse(JSON.stringify(req.user))
    const newTask = new Task({
        user_Id: user._id,
        clicked: false,
        text: req.body.task
    })
    await newTask.save()
    const result = await Task.find({user_Id: req.user._id});  
     res.send(result);
}

const updateCompleted = async (req,res)=>{   
    await Task.updateOne({_id: req.body.uid},{clicked: !req.body.clicked})
    const result = await Task.find({user_Id: req.user._id});
    res.send(result)
}

const deleteOne = async (req,res)=>{  
    await Task.findOneAndDelete({_id: req.body.uid})
    const result = await Task.find({user_Id: req.user._id});
    res.send(result)    
}

const clearCompleted = async (req, res)=>{
    await Task.deleteMany({clicked: true})
    const result = await Task.find({user_Id: req.user._id});
    res.json(result)
}

const refactor = (req,res)=>{
    const result = req.body.refactoredTasks;
    Task.deleteMany({})
    .then(()=>Task.insertMany(result))
    .then(()=>res.send())
    .catch(e=>console.log(e))
}

export { home, getFormInput, updateCompleted, deleteOne, clearCompleted, refactor }