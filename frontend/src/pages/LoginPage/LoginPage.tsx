import { CustomLink } from "../../components/CustomLink/CustomLink"

export const LoginPage = () => {
  return (
    <>
      <h1>Логин</h1>
      <p>или {<CustomLink to="/registration">регистрация</CustomLink>}</p>
    </>
  )
}
