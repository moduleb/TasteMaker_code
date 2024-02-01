import { ChangeEvent, useState } from "react"
import s from "./Input.module.css"
import emailIcon from "../../../assets/icons/email.png"
import passwordHiddenIcon from "../../../assets/icons/password-hidden.png"
import passwordIcon from "../../../assets/icons/password.png"

type Props = {
  type: "text" | "password" | "email"
  handler: (value: string) => void
  value: string
  placeholder?: string
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

export const Input = ({ type, handler, value, placeholder }: Props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handler(e.target.value)
  }
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

  return (
    <label className={s.label}>
      <input
        className={s.input}
        type={inputType}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      <img
        src={iconSrc}
        className={s.icon}
        alt="icon"
        onClick={iconClickHandler}
      />
    </label>
  )
}
