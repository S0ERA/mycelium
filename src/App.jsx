// import AppRoutes from './routes/AppRoutes.jsx';
// import NavBar from "./components/NavBar.jsx";
// import Logo from './assets/logo.png';

import './App.css'
import {Routes, Route} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import PostPage from "./pages/PostPage.jsx";
import Analitics from "./pages/Analitics.jsx";
import NavBar from "./components/NavBar.jsx";


function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/post/:id" element={<PostPage />}/>
                <Route path="/analitics" element={<Analitics />}/>
                <Route path="*" element={<Login />}/>
            </Routes>
        </>
    )
}

export default App
