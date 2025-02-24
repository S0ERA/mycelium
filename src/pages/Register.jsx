import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (localStorage.getItem("currentUser")) {
            navigate('/home');
        }


    }, [navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("Все поля обязательны!");
            return;
        }
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(email)) {
            alert("Некорректный email!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(u => u.email === email)) {
            alert("Пользователь с таким email уже существует!")
            return;
        }

        const user = {
            id: Date.now(),
            name,
            email,
            password,
        }
        localStorage.setItem("users", JSON.stringify([...users, user]));
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/home");
        window.dispatchEvent(new Event('storage'));
    }

    return (
        <div className="auth-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    } required/>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    } required/>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    } required/>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    )
}

export default Register;