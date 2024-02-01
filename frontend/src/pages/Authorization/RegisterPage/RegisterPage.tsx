import { Form } from "../../../components/UI/Form/Form.tsx"
import { Input } from "../../../components/UI/Input/Input.tsx"
import { Button } from "../../../components/UI/Button/Button.tsx"
import { useState } from "react"
import s from "../AuthForm.module.css"
export const RegisterPage = () => {
  const onRegister = (email: string, pass: string) => {
    console.log(email, pass)
  }
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  return (
    <>
      <Form
        title="Главная/Регистрация"
        handleSubmit={() => onRegister(email, pass)}
        styles={s.form}
      >
        <Input
          type="email"
          handler={setEmail}
          value={email}
          placeholder="Email"
        />
        <Input
          type="password"
          handler={setPass}
          value={pass}
          placeholder="Пароль"
        />
        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </>
  )
}
