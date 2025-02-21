import {Link} from "react-router-dom";

function NavBar() {
    return (
        <nav className="navBar">
            <Link to='/register'>reg</Link>
            <Link to='/login'>log</Link>
            <Link to='/'>res</Link>
        </nav>
    )
}

export default NavBar;