import Logo from "../assets/logo.png";
import NavBar from "../components/NavBar/NavBar.jsx";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.appHeader}>
      <img src={Logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.textLogo}>{`{ MYCELIUM }`}</h1>
      <NavBar />
    </header>
  );
}

export default Header;
