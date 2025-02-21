import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            navigate("/home");
        } else {
            setError("Неправильный email или пароль");
        }
    }

    return (
        <div className="auth-container">
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Войти</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default Login;