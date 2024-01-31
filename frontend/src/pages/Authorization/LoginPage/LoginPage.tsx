import { Form } from "../../../components/UI/Form/Form.tsx"
import { useState } from "react"
import s from "../AuthForm.module.css"
import { Input } from "../../../components/UI/Input/Input.tsx"
import { Button } from "../../../components/UI/Button/Button.tsx"
import { Link } from "react-router-dom"

export const LoginPage = () => {
  const onLogin = (email: string, pass: string) => {
    console.log(email, pass)
  }
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  return (
    <>
      <Form
        title="Главная/Войти на сайт"
        handleSubmit={() => onLogin(email, pass)}
        styles={s.form}
      >
        <Input
          type="email"
          handler={setEmail}
          value={email}
          placeholder="Email"
        />
        <Input type="password" handler={setPass} value={pass} />
        <Button type="submit">Войти</Button>
        <p>У вас еще нет логина?</p>
        <Link to="/registration">Зарегистрируйтесь!</Link>
      </Form>
    </>
  )
}
