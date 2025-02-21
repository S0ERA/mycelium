// import AppRoutes from './routes/AppRoutes.jsx';
// import NavBar from "./components/NavBar.jsx";
// import Logo from './assets/logo.png';
import "./styles/reset.css"
import './App.css'
import {Routes, Route, useNavigate} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import PostPage from "./pages/PostPage.jsx";
import Analitics from "./pages/Analitics.jsx";
import NavBar from "./components/NavBar.jsx";
import {useEffect, useState} from "react";


function App() {
    // const [user, setUser] = useState(null);
    const navigate = useNavigate("/register");
    const navHome = useNavigate("/home");

    const isAuthenticated = !!localStorage.getItem("user");
    //
    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, [])
    //
    // const handleLogin = (userData) => {
    //     localeStorage.setItem("user", JSON.stringify(userData));
    //     setUser(userData);
    // }
    //
    // const handleLogout = () => {
    //     setUser(null);
    // }

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/home" element={isAuthenticated ? <Home /> : navigate}/>
                <Route path="/post/:id" element={isAuthenticated ? <PostPage /> : navigate}/>
                <Route path="/analitics" element={isAuthenticated ? <Analitics /> : navigate}/>
                <Route path="*" element={<h1>СТРАНИЦА НЕ НАЙДЕНА</h1>} />
            </Routes>
        </>
    )
}

export default App
