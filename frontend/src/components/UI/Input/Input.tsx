import { useState } from "react"
import s from "./Input.module.css"
import emailIcon from "../../../assets/icons/email.png"
import passwordHiddenIcon from "../../../assets/icons/password-hidden.png"
import passwordIcon from "../../../assets/icons/password.png"
import { useValidationReturnType } from "../../../hooks/useValidation.ts"
import { useInputReturnType } from "../../../hooks/useInput.ts"

interface Props extends useValidationReturnType, useInputReturnType {
  type: "text" | "password" | "email"
  placeholder?: string
  name?: string
}
// функция для получения src иконки. когда появятся другие виды инпутов, нужно будет переделать
const getIconSrc = (type: "email" | "text" | "password") => {
  if (type === "email") {
    return emailIcon
  }
  if (type === "password") {
    return passwordIcon
  }
  return passwordHiddenIcon
}

export const Input = ({
  type,
  onChange,
  onBlur,
  value,
  placeholder,
  name,
  isEmpty,
  maxLengthError,
  minLengthError,
  passwordError,
  emailError,
  dirty,
}: Props) => {
  const [iconSrc, setIconSrc] = useState(getIconSrc(type))
  const [inputType, setInputType] = useState(type)

  const iconClickHandler = () => {
    if (type !== "password") return
    if (inputType === "password") {
      setIconSrc(passwordHiddenIcon)
      setInputType("text")
    } else if (inputType === "text") {
      setIconSrc(passwordIcon)
      setInputType("password")
    }
  }

  const errorMessage = () => {
    if (!dirty) return ""
    if (isEmpty) {
      return "Поле не должно быть пустым"
    }
    return (
      [maxLengthError, minLengthError, passwordError, emailError].find(
        (error) => error,
      ) || ""
    )
  }

  return (
    <>
      <span className={s.errorMessage}>{errorMessage()}</span>
      <label className={s.label}>
        <input
          className={s.input}
          type={inputType}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          name={name || type}
          onBlur={onBlur}
        />
        <img
          src={iconSrc}
          className={s.icon}
          alt="icon"
          onClick={iconClickHandler}
        />
      </label>
    </>
  )
}
