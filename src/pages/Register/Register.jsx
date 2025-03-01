import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";
import {createUser, validateForm} from "../../constants/constants.js";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validationError = validateForm(name, email, password, users);

    if (validationError) {
      setError(validationError);
      return;
    }

    const user = createUser(name, email, password);

    localStorage.setItem("users", JSON.stringify([...users, user]));
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/home");
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/home");
    }
  }, [navigate]);

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
        className="authInput"
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="authInput"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
}

export default Register;
