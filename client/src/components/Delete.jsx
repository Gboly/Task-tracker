import darkModeDel from "../close-dark-mode.jpg"
import lightModeDel from "../close-light-mode.jpg"

function Delete(props){

function deleteOnClick(){
    props.deleteTask(props.uid);
}

    return <button className="delete" style={{visibility:props.visibility}} onClick={deleteOnClick}>
    <img style={{width:"inherit", height:"inherit"}}
         src={props.mode ? lightModeDel : darkModeDel}
          alt="delete"></img>
    </button>
}

export default Delete;