import { useMemo, useState } from "react"
import s from "./Input.module.css"
import emailIcon from "../../../assets/icons/email.png"
import passwordHiddenIcon from "../../../assets/icons/password-hidden.png"
import passwordIcon from "../../../assets/icons/password.png"
import { useValidationReturnType } from "../../../hooks/useValidation.ts"
import { useInputReturnType } from "../../../hooks/useInput.ts"
import { getErrorMessage } from "../../../utils/getErrorMessageInput.ts"

interface Props extends useValidationReturnType, useInputReturnType {
  type: "text" | "password" | "email"
  placeholder?: string
  name?: string
  allowedSymbols?: number
}

const icons = {
  email: emailIcon,
  password: passwordIcon,
  passwordHidden: passwordHiddenIcon,
  text: null,
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
  allowedSymbols,
}: Props) => {
  const [iconSrc, setIconSrc] = useState(icons[type])
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
  const errorMessage = useMemo(
    () =>
      getErrorMessage({
        dirty,
        isEmpty,
        maxLengthError,
        minLengthError,
        passwordError,
        emailError,
      }),
    [dirty, isEmpty, maxLengthError, minLengthError, passwordError, emailError],
  )

  return (
    <>
      <label className={s.label}>
        <input
          className={`${s.input} ${!errorMessage ? "" : s.error}`}
          type={inputType}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          name={name || type}
          onBlur={onBlur}
        />
        {iconSrc && (
          <img
            src={iconSrc}
            className={s.icon}
            alt="icon"
            onClick={iconClickHandler}
          />
        )}

        {allowedSymbols && !errorMessage && (
          <span className={s.message}>
            Можно ввести знаков: {allowedSymbols}
          </span>
        )}

        {errorMessage && (
          <span className={s.message + " " + s.error}>{errorMessage}</span>
        )}
      </label>
    </>
  )
}
