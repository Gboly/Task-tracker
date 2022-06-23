import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Form from './Form';
import Header from './Header';
import Tasks from './Tasks';
//import {Outlet} from "react-router-dom"
// import bgDesktopLight from "../bg-desktop-light.jpg"

function App({bodyNode}){   
    const [tasks,setTasks] = useState([]);
    const [mode, setMode] = useState(true)
    
    const [newTasks, setNewtasks] = useState(tasks) 
    
    const tasksRef = useRef()
    const navigate = useNavigate()

    useEffect(()=>{
        document.body.className = "html-light";
    },[])

    useEffect(()=>{
        setNewtasks(tasks)
        tasksRef.current = tasks;
    }, [setNewtasks, tasks])

    useEffect(()=>{
        fetch("/home")
        .then(res=>res.json())
        .then(tasks=>setTasks([...tasks]))
        .catch(e=>console.log(e))
    },[])

    function updateTasks(task, uuid){       
        fetch("/getFormInput",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({task})
        })
        .then(res=>res.json())
        .then(tasks=> setTasks([...tasks]))
        .catch(e=>console.log(e)) ;                 
    }

    function switchMode(){
        setMode(!mode)
    }

    function updateClick(uid, clicked){
        fetch("/updateCompleted",{
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({uid, clicked})
        })
        .then(res=>res.json())
        .then(tasks=> setTasks([...tasks]))
        .catch(e=>console.log(e))
    }

    function deleteTask( uid ){
        fetch("/delete",{
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({uid})
        })
        .then(res=>res.json())
        .then(tasks=> setTasks([...tasks]))
        .catch(e=>console.log(e)) 
     }

    function refactorWdragEnter(dragItem, target){
        setTasks(oldTasks=>{
            let newList = JSON.parse(JSON.stringify(oldTasks));
            const spliced = newList[dragItem]
            newList.splice(dragItem, 1)
            newList.splice(target, 0, spliced)
            return newList;
        })
    }

    function dragEndToDB(){
        fetch("/refactor",{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({refactoredTasks: tasksRef.current})
        })
        //since dragEnter is directly setting task to the dragNdrop value, i dont need to set Task here again
        //All i need to do is save to my DB here and that's all.
        .then(()=> console.log("saved to DB"))
        .catch(e=>console.log(e))        
    }
    
    function clearCompleted(){
        fetch("/clearCompleted",{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(tasks=>setTasks([...tasks]))
        .catch(e=>console.log(e))
    }
    
    function handleLogOut(){
        fetch("auth/local/logout")
        .then(res=>res.json())
        .then(({error})=>{
            if(!error){window.location.replace("/")}
            else{console.log(error)}
        })
    }
    
    return <div className="body" >
        <div className="container">
            <Header switchMode={switchMode} mode={mode} bodyNode={bodyNode} />
            <Form updateTasks={updateTasks} mode={mode} />
            <Tasks {...{tasks:tasks, mode:mode, newTasks:newTasks, refactorWdragEnter:refactorWdragEnter,
                        deleteTask:deleteTask, updateClick:updateClick, clearCompleted:clearCompleted,
                        dragEndToDB:dragEndToDB
                    }} />
            <Footer mode={mode} />
            <button onClick={handleLogOut} className="home-button login-button">Log out</button>
        </div>
        
    </div>
}

export default App;