import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/Routes/ROUTES.js";
import Register from "../pages/Register/Register.jsx";
import Login from "../pages/Login/Login.jsx";
import Home from "../pages/Home/Home.jsx";
import PostPage from "../pages/PostPage/PostPage.jsx";
import Analytics from "../pages/Analytics/Analytics.jsx";
import SecuredRoute from "../constants/Routes/SecuredRoute.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />

      <Route element={<SecuredRoute />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.POST} element={<PostPage />} />
        <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
      </Route>
      <Route path="*" element={<h1>СТРАНИЦА НЕ НАЙДЕНА</h1>} />
    </Routes>
  );
}

export default AppRoutes;
