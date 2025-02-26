import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaSignOutAlt, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import styles from "./NavBar.module.css";

function NavBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem("currentUser");
      setIsLoggedIn(!!user);
    };

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.navItems}>
        {isLoggedIn ? (
          <>
            <Link to="/home" className={styles.navLink}>
              <FaHome className="icon" />
            </Link>
            <button onClick={handleLogout} className={styles.navButton}>
              Sign Out
              <FaSignOutAlt className="icon" />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>
              Sign in
              <FaSignInAlt className="icon" />
            </Link>
            <Link to="/register" className={styles.navLink}>
              Sign up
              <FaUserPlus className="icon" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
