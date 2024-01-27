import { CustomForm } from "../../components/Form/CustomForm.tsx"
export const RegisterPage = () => {
  const onRegister = (email: string, pass: string) => {}
  return (
    <>
      <CustomForm
        title="Главная/Регистрация"
        btnText="Зарегистрироваться"
        handleClick={onRegister}
      />
    </>
  )
}
