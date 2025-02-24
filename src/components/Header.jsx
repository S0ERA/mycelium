import Logo from "../assets/logo.png";
import NavBar from "./NavBar.jsx";

function Header() {

    return (
        <header className="appHeader">
            <img src={Logo} alt="Logo" className='logo' />
            <h1 className="textLogo">{`{ MYCELIUM }`}</h1>
            <NavBar />
        </header>
    )
}

export default Header;