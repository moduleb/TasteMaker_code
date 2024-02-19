export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

export const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 64) {
    return "Пароль должен содержать от 8 до 64 символов"
  }
  // Проверка на строчную букву
  if (!/(?=.*[a-z])/.test(password)) {
    return "В пароле должна быть хотя бы одна строчная буква"
  }

  // Проверка на заглавную букву
  if (!/(?=.*[A-Z])/.test(password)) {
    return "В пароле должна быть хотя бы одна заглавная буква"
  }

  // Проверка на цифру
  if (!/(?=.*[0-9])/.test(password)) {
    return "В пароле должна быть хотя бы одна цифра"
  }

  // Проверка на специальный символ
  if (!/(?=.*[!@#$%^&*])/.test(password)) {
    return "В пароле должен быть хотя бы один специальный символ"
  }

  if (/[^a-zA-Z0-9!@#$%^&*]/.test(password)) {
    return "В пароле должна быть только латиница, цифры и специальные символы"
  }

  return ""
}