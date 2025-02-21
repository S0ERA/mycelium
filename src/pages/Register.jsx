import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate('/home');
        }
    }, [navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("Все поля обязательны!");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Некорректный email!");
            return;
        }
        localStorage.setItem("user", JSON.stringify({name, email, password}));
        navigate("/home");
    }

    return (
        <>
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
        </>
    )
}

export default Register;