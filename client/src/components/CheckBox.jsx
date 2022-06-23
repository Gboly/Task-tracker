
export default function CheckBox(props){    

    function clickCheckBox(){
       props.updateClick(props.uid, props.clicked);           
    }
    function getStyle(){
        return  props.dragItem === props.index ? "dragged-check-box" : props.mode ? "check-box-light" : "check-box-dark"
    }
    
    return <button id="checkbox-button"><div 
    className={`check-box ${props.mode ? props.isDragging ? getStyle() : "check-box-light" : props.isDragging ? getStyle() : "check-box-dark"}`} 
    style={props.style} 
    onClick={clickCheckBox} >
    {props.check}
    </div>
    </button>
}