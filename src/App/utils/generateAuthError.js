export function generateAuthError(error) {
    switch (error) {
        case "EMAIL_EXISTS":
            return "Пользователь с таким email существует";
        case "INVALID_PASSWORD":
            return "Неверный пароль";
        case "EMAIL_NOT_FOUND":
            return "Неверный email";

        default:
            return "Слишком много попыток входа";
    }
}
