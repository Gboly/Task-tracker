import { useState } from "react";
import CheckBox from "./CheckBox";
import Delete from "./Delete";
import Task from "./Task";

function TaskBlock(props){
    
    const [visibility, setVisibility] = useState("hidden")
    
    function showDeleteButton(){
        setVisibility("visible")
    }
    function hideDeleteButton(){
        setVisibility("hidden")
    }
    function handleDragStart(e, position){      
        props.dragStart(e, position)
    }
    function handleDragEnter(e, targetPosition){
        props.dragEnter(e, targetPosition)
    }
    function getStyle(){
      return  props.dragItem === props.index ? props.mode ?  "dragged-light" : "dragged-dark" : props.mode ? "taskblock-light" : "taskblock-dark"
    }
    function getDragStyle(){
        return props.dragItem === props.index ? null : {backgroundImage:" radial-gradient(circle at top left,  hsl(192, 100%, 67%),hsl(280, 87%, 65%))"}
    }
    function getDragCheck(){
        return props.dragItem === props.index ? null : "✔"
    }
 

    return    <li id={props.index}
                   className={props.mode ? props.isDragging ? getStyle() : "taskblock-light" : props.isDragging ? getStyle() : "taskblock-dark"}
                   onMouseOver={showDeleteButton}
                   onMouseOut={hideDeleteButton}
                   draggable="true"
                   onDragStart={e=>handleDragStart(e, props.index)}
                   onDragOver={e=>e.preventDefault()}
                   onDragEnter={e=>handleDragEnter(e, props.index)}                   
                   >
                <CheckBox
                 updateClick={props.updateClick}
                 check={props.clicked 
                 ? props.isDragging ? getDragCheck() : "✔" 
                 : null }
                 style={props.clicked 
                 ? props.isDragging ? getDragStyle() : {backgroundImage:" radial-gradient(circle at top left,  hsl(192, 100%, 67%),hsl(280, 87%, 65%))"}
                 : null}
                 mode={props.mode}
                 isDragging={props.isDragging}
                 dragItem={props.dragItem}
                 index={props.index}
                 uid={props.uid}
                 clicked={props.clicked} />
                <Task task={props.task} strike={props.clicked} mode={props.mode} isDragging={props.isDragging} dragItem={props.dragItem} index={props.index} />
                <Delete visibility={visibility} task={props.task} deleteTask={props.deleteTask} mode={props.mode} uid={props.uid} />
            </li>
}

export default TaskBlock;



