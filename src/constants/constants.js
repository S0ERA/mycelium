export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const idUser = Date.now();

export const createUser = (name, email, password) => ({
    id: idUser,
    name,
    email,
    password,
});

export const validateForm = (name, email, password, users) => {
    if (!name || !email || !password) {
        return "Все поля обязательны!";
    }

    if (!emailRegex.test(email)) {
        return "Некорректный email!";
    }

    if (users.some((u) => u.email === email)) {
        return "Пользователь с таким email уже существует!";
    }

    return null; // Если ошибок нет
};