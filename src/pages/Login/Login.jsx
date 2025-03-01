import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name || !password) {
      setError("Все поля обязательны к заполнению");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.name === name && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
      window.location.reload();
    } else {
      setError("Неправильное имя или пароль");
    }
  };

  return (
    <AuthForm
      title="Вход"
      onSubmit={handleLogin}
      error={error}
      submitText="Войти"
      footerContent={
        <div>
          <p className="noRegNoLog">Нет аккаунта? </p>
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/register")}
          >
            Зарегистрироваться
          </button>
        </div>
      }
    >
      <input
        className="authInput"
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="authInput"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </AuthForm>
  );
};

export default Login;
