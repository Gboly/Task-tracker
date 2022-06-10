import TaskBlock from './TaskBlock';
import Actions from './Actions';
import { useRef ,useEffect, useState } from 'react';


export default function Tasks(props){
    const [list, setList] = useState(props.newTasks)
    const [isDragging, setIsDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef()

    const [completed, setCompleted] = useState([])
    const [active, setActive] = useState([])
    const [filter, setFilter] = useState("All")
      
    useEffect(()=>{
        setList(props.newTasks);
    },[setList, props.newTasks])
    
    useEffect(()=>{
        setCompleted(()=>list.filter(comp=>comp.clicked === true))
    },[setCompleted, list])

    useEffect(()=>{
        setActive(()=>list.filter(act=>act.clicked === false))
    },[setActive, list])
    

    function changeFilter(filterName){
        setFilter(filterName)
    }    

    function dragStart(e, item){
        dragNode.current = e.target;        
        dragNode.current.addEventListener("dragend", handleDragEnd);
        dragItem.current = item;
        setTimeout(()=> setIsDragging(true), 0)
    }
    function dragEnter(e, targetItem){        
        if(dragNode.current !== e.target){            
            props.refactorWdragEnter(dragItem.current, targetItem);
            dragItem.current = targetItem;
        }
    }
    function handleDragEnd(){
        setIsDragging(false);
        dragItem.current = null;
        dragNode.current.removeEventListener("dragend", handleDragEnd);
        dragNode.current = null;
    }
    
    return  <div className={`main ${props.mode ? "main-light" : "main-dark" }`} ><ul id="main-body" >
    
    {(filter === "All" ? list : filter === "Completed" ? completed : filter === "Active" && active).map(
        ({clicked,text,id},index) =>
            <TaskBlock key={id}
                task={text}
                clicked={clicked}
                uid={id}              
                deleteTask={props.deleteTask}
                mode={props.mode}
                index={index}                
                dragStart={dragStart}
                isDragging ={isDragging}
                dragItem={dragItem.current}
                dragEnter={dragEnter}
                updateClick={props.updateClick}                
            />
        )
    }
    
    </ul>    
    <Actions activeLength={active.length} completedLength={completed.length} listLength={list.length} mode={props.mode} changeFilter={changeFilter} clearCompleted={props.clearCompleted} />
 </div>
}