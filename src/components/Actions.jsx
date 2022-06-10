import { useState } from "react";

function Actions(props){
    const [activeFilter, setActiveFilter] = useState("All")

    function setFilter(filter){
        props.changeFilter(filter);
        setActiveFilter(filter)
    }
    function delCompleted(){
        props.clearCompleted()
    }

    function info(){
        return activeFilter === "All" 
        ? props.listLength === 0 
        ? "Add an item" 
        : `${props.activeLength} item${props.activeLength > 1 ? "s" : ""} left`
        : activeFilter === "Active"
        ? props.activeLength === 0
        ? "Completed ALL"
        : `${props.activeLength} item${props.activeLength > 1 ? "s" : ""} left`
        : activeFilter === "Completed"
        && props.completedLength === 0
        ? "Completed NONE"
        : `${props.completedLength} item${props.completedLength > 1 ? "s" : ""} done`
    }


    return <div className={`bottom ${props.mode ? "bottom-light" : "bottom-dark"}`}>
    <span>{info()} </span>
    <span className="filter">
    <span onClick={()=>setFilter("All")} id="All" className={activeFilter === "All" ? "active-filter-option" : "filter-option"} >All</span>
    <span onClick={()=>setFilter("Active")} id="Active" className={activeFilter === "Active" ? "active-filter-option" : "filter-option"} >Active</span>
    <span onClick={()=>setFilter("Completed")} id="Completed" className={activeFilter === "Completed" ? "active-filter-option" : "filter-option"} >Completed</span>
    </span>
    <span onClick={delCompleted} id="Clear completed" className="filter-option" > Clear completed</span>  
    </div>
}

export default Actions;

// onClick={filter}