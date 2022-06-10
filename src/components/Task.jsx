
export default function Task(props){

    function getStyle(){
        return  props.dragItem === props.index ? (props.mode ?  "dragged-h3-light" : "dragged-h3-dark") : (props.mode ? "h3-light" : "h3-dark")
    }
    function getText(){
        return props.dragItem === props.index ? "" : props.task
    }

    return <h3 className={props.mode ? props.isDragging ? getStyle() : "h3-light" : props.isDragging ? getStyle() : "h3-dark" }
     style={props.strike 
     ? props.mode ? {textDecoration:"line-through", color: "rgba(120,122,143,0.3)"} : {textDecoration:"line-through", color: "rgba(120,122,143,0.5)"}
     : null
     }>
     {props.isDragging ? getText() : props.task}
    </h3>
}