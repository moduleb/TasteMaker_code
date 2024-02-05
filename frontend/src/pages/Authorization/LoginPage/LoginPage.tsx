import { Form } from "../../../components/UI/Form/Form.tsx"
import { useState } from "react"
import s from "../AuthForm.module.css"
import { Input } from "../../../components/UI/Input/Input.tsx"
import { Button } from "../../../components/UI/Button/Button.tsx"
import { Link, Navigate } from "react-router-dom"
import { useAppDispatch } from "../../../hooks/reduxHooks.ts"
import { loginByEmail } from "../../../store/slices/authorization/userActions.ts"
import { useAuth } from "../../../hooks/useAuth.ts"

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAuth()
  const onLogin = (email: string, password: string) => {
    dispatch(loginByEmail({ email, password }))
  }
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  return isAuth ? (
    <Navigate to="/" />
  ) : (
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
