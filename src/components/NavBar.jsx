import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

function NavBar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => {
            const user = localStorage.getItem('currentUser');
            setIsLoggedIn(!!user);
        };

        handleStorageChange();

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navItems">
                {isLoggedIn ? (
                    <>
                        <Link to="/home" className="navLink">Домой</Link>
                        <Link to="/analytics" className="navLink">Аналитика</Link>
                        <button onClick={handleLogout} className="navButton">Выйти</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navLink">Войти</Link>
                        <Link to="/register" className="navLink">Зарегистрироваться</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;