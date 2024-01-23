import {CustomLink} from "../components/CustomLink";

export const RegisterPage = () => {
  return (
    <>
      <h1>Регистрация</h1>
      <p>
        или {<CustomLink to="/login">залогинься</CustomLink>}
      </p>
    </>
  )
}