import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import { useEffect, useRef, useState } from "react"

let gottenNode =false;

function Header(props){
   const [currentMode, setCurrentMode] = useState(props.mode)
  
   //Right after stressing for 2 days stress on how to manipulate the body node, using a non-ending parentnode,
   //using recursive helper functions, and also with this method i have stuck with by passing the node as props
   //to App inside index.js, I have now realised I can easily write document.body inside a useEffect to achieve this  
   const bodyNode = useRef();

   useEffect(()=>{
      setCurrentMode(props.mode);
      //this is just to show the easy method i just learnt but i would just stick to this props way. 
      console.log(document.body.classList)       
   }, [props.mode])


   function modeSwitch(e){
      props.switchMode();
        if(!gottenNode){
           bodyNode.current = props.bodyNode      
          gottenNode=true
       }
       !currentMode ? bodyNode.current.className="html-light" : bodyNode.current.className="html-dark"
    }


   return      <div className="header"><h1 id='header-h1'>TODO</h1>
                     <div onClick={(e)=>modeSwitch(e)} >
                      {currentMode
                      ? <NightlightRoundIcon fontSize="inherit" color="inherit" />
                      : <LightModeIcon fontSize="inherit" color="inherit" />
                      }
                     </div>
                  </div>
            
}

export default Header;

// let gottenInitParentNode =false;

//    clickedNode.current = e.target;
      //    recursive();
      //    //bodyNode.current = clickedNode.current.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;         
      //    //console.log(getBodyNode(clickedNode.current, 2));
      //    console.log("once and never again")

      
   //  function recursive(){
   //     for(let i=0; i<7; i++){
   //        if(!gottenInitParentNode){parentNode.current = clickedNode.current.parentNode}
   //        else{
   //          parentNode.current = parentNode.current.parentElement
   //        }
   //        gottenInitParentNode = true;
   //     }
   //  }
    
    //recursive helper function
   //  function getBodyNode(initNode, n){
   //     return initNode===0 ? initNode : getBodyNode(initNode.parentNode, n-1);
   //  }

      // if(props.mode){
      //    htmlOrBodyNode.current.className="html-light"
      //    // bodyNode.current.classList.remove("html-dark");
      //    // bodyNode.current.classList.add("html-light");
      // } else{
      //    htmlOrBodyNode.current.className="html-dark"
      //    // bodyNode.current.classList.remove("html-light");
      //    // bodyNode.current.classList.add("html-dark");
      // }

      
   // const clickedNode = useRef();
   // const parentNode = useRef();
   // //The node here is inconsistent, sometimes its html node and other times its the body node.
   // //I have decided to modify the classes of both. 
   // const htmlOrBodyNode = useRef();