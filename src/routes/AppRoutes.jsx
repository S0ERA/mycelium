import {Routes, Route, Navigate} from "react-router-dom";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import PostPage from "../pages/PostPage.jsx";
import Analytics from "../pages/Analytics.jsx";

function AppRoutes() {
    const isAuthenticated = !!localStorage.getItem("currentUser");

    return (
       <Routes>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to='/login' />}/>
                <Route path="/post/:id" element={isAuthenticated ? <PostPage /> : <Navigate to='/login' />}/>
                <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to='/login' />}/>
                <Route path="*" element={<h1>СТРАНИЦА НЕ НАЙДЕНА</h1>} />
            </Routes>
    )
}

export default AppRoutes;