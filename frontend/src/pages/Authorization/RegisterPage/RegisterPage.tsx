import { Form } from "../../../components/UI/Form/Form.tsx"
import { Input } from "../../../components/UI/Input/Input.tsx"
import { Button } from "../../../components/UI/Button/Button.tsx"
import { useState } from "react"
import s from "../AuthForm.module.css"
import { registerByEmail } from "../../../store/slices/authorization/userActions.ts"
import { useAppDispatch } from "../../../hooks/reduxHooks.ts"
import { useAuth } from "../../../hooks/useAuth.ts"
import { Navigate } from "react-router-dom"
export const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAuth()
  const onRegister = (email: string, password: string) => {
    dispatch(registerByEmail({ email, password }))
  }
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  return isAuth ? (
    <Navigate to="/" />
  ) : (
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
