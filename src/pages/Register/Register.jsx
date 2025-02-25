import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm.jsx";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Все поля обязательны!");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      setError("Некорректный email!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) {
      setError("Пользователь с таким email уже существует!");
      return;
    }

    const user = {
      id: Date.now(),
      name,
      email,
      password,
    };

    localStorage.setItem("users", JSON.stringify([...users, user]));
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/home");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AuthForm
      title="Регистрация"
      onSubmit={handleSubmit}
      error={error}
      submitText="Зарегистрироваться"
      footerContent={
        <div>
          <p className="noRegNoLog">Уже есть аккаунт? </p>
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/login")}
          >
            Войти
          </button>
        </div>
      }
    >
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </AuthForm>
  );
}

export default Register;
