import { Outlet } from "react-router-dom"
import { CustomLink } from "../CustomLink/CustomLink"

export const Layout = () => {
  return (
    <>
      <header>
        <CustomLink to="/">Главная</CustomLink>
        <CustomLink to="/registration">регистрация</CustomLink>
        <CustomLink to="/login">логин</CustomLink>
      </header>
      <Outlet />
      <footer>footer 2024</footer>
    </>
  )
}
