import Logo from "../assets/logo.png";
import NavBar from "./NavBar.jsx";
import {Link} from "react-router-dom";

function Header() {

    return (
        <header className="appHeader">
            <Link to="/home"><img src={Logo} alt="Logo" className='logo' /></Link>
            <h1 className="textLogo">{`{ MYCELIUM }`}</h1>
            <NavBar />
        </header>
    )
}

export default Header;