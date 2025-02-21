import {Link} from "react-router-dom";

function NavBar() {
    return (
        <nav className="navBar">
            <Link to='/register'>reg</Link>
            <Link to='/login'>log</Link>
            <Link to='/home'>home</Link>
        </nav>
    )
}

export default NavBar;