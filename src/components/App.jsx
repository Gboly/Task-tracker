import { useEffect, useState } from 'react';
import Footer from './Footer';
import Form from './Form';
import Header from './Header';
import Tasks from './Tasks';
// import bgDesktopLight from "../bg-desktop-light.jpg"

function App({bodyNode}){   
    const [tasks,setTasks] = useState([]);
    const [mode, setMode] = useState(true)
    
    const [newTasks, setNewtasks] = useState(tasks)    

    useEffect(()=>{
        setNewtasks(tasks)
    }, [setNewtasks, tasks])


    function updateTasks(task, uuid){        
            setTasks([...tasks,{clicked:false, text:task, id:uuid}]);                  
    }

    function switchMode(){
        setMode(!mode)
    }

    function updateClick(uid){
        setTasks((oldTasks)=>{
          return oldTasks.reduce((cummulative, task)=>{
            task.id === uid ? cummulative.push({clicked: !task.clicked, text: task.text, id: task.id}) : cummulative.push(task)
            return cummulative
          },[])
        })
    }

    function deleteTask( uid ){
        setTasks ((oldTasks)=>oldTasks.filter(itm => uid !== itm.id));
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
    
    function clearCompleted(){
        setTasks(oldTasks=>oldTasks.filter(task=>task.clicked === false))
    }
 
    
    return <div className="body" >       
        <div className="container">        
            <Header switchMode={switchMode} mode={mode} bodyNode={bodyNode} />
            <Form updateTasks={updateTasks} mode={mode} />
            <Tasks {...{tasks:tasks, mode:mode, newTasks:newTasks, refactorWdragEnter:refactorWdragEnter,
                        deleteTask:deleteTask, updateClick:updateClick, clearCompleted:clearCompleted
                    }} />     
            <Footer mode={mode} />
        </div>
    </div>
}

export default App;