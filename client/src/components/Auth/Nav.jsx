import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import "./nav.css"

export default function Nav(){

    return (
        <nav className="navbar navbar-light justify-content-between">
            <div className="brand-logo"><div>T</div></div>
            <div className='icon'>
            <NightlightRoundIcon fontSize="inherit" color="inherit" />                      
            </div>
        </nav>
    )
}