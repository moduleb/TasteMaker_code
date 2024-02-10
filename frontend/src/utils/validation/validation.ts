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
  if (!password.match(/^\D*\d/)) {
    return "Пароль должен включать латиницу, цифры и специальные символы"
  }
  //eslint-disable-next-line
  if (!password.match(/([^a-zA-Z\d]*)[-!@#$%^&*()_+|~=`{}\[\]:;"'<>,.?\\/]/)) {
    return "Пароль должен включать латиницу, цифры и специальные символы"
  }
  if (!password.match(/^(?=.*[a-zA-Z])/)) {
    return "Пароль должен включать латиницу, цифры и специальные символы"
  }
  return ""
}
