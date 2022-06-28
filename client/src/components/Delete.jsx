import darkModeDel from "../srcImages/close-dark-mode.jpg"
import lightModeDel from "../srcImages/close-light-mode.jpg"

function Delete(props){

function deleteOnClick(){
    props.deleteTask(props.uid);
}

    return <div className="delete" style={{visibility:props.visibility}} onClick={deleteOnClick}>
    <img style={{width:"inherit"}}
         src={props.mode ? lightModeDel : darkModeDel}
          alt="delete"></img>
    </div>
}

export default Delete;