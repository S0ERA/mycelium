import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "../pages/Register/Register.jsx";
import Login from "../pages/Login/Login.jsx";
import Home from "../pages/Home/Home.jsx";
import PostPage from "../pages/PostPage/PostPage.jsx";
import Analytics from "../pages/Analytics/Analytics.jsx";

function AppRoutes() {
  const navigate = useNavigate("/login");
  const isAuthenticated = !!localStorage.getItem("currentUser");

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : navigate} />
      <Route
        path="/post/:id"
        element={isAuthenticated ? <PostPage /> : navigate}
      />
      <Route
        path="/analytics"
        element={isAuthenticated ? <Analytics /> : navigate}
      />
      <Route path="*" element={<h1>СТРАНИЦА НЕ НАЙДЕНА</h1>} />
    </Routes>
  );
}

export default AppRoutes;
