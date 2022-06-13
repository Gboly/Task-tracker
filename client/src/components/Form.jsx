import { useState } from "react";

function Form(props){
    const [input, setInput] = useState("")
    const [uuid, setUuid] = useState(1);

    function updateInput(e){
        const {value}=e.target;
        setInput(value)
    }
    function updateTask(e){
        setUuid(oldValue => oldValue + 1)
       input && props.updateTasks(input, uuid)
        setInput("")
        e.preventDefault();        
    }

    return <form className={props.mode ? "form-light" : "form-dark" } >
    <button type="submit" onClick={updateTask}><div className={`submit ${props.mode ? "submit-light" : "submit-dark"}`} ></div></button>
    <input className={props.mode ? "form-input-light" : "form-input-dark"} onChange={updateInput} type="text" placeholder="Create a new todo..." value={input} autoFocus />     
</form>
}

export default Form;