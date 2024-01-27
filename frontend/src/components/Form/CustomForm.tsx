import { useState } from "react"

interface FormProps {
  title: string
  children?: React.ReactNode
  btnText: string
  handleClick: (email: string, pass: string) => void
}
export const CustomForm = ({
  title,
  children,
  btnText,
  handleClick,
}: FormProps) => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleClick(email, pass)
  }

  return (
    <form action="#" onSubmit={onSubmit}>
      <h2>{title}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={onSubmit}>{btnText}</button>
      {children}
    </form>
  )
}
