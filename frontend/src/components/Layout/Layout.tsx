import { Outlet } from "react-router-dom"
import s from "./Layout.module.css"
import { Header } from "../Header/Header.tsx"

export const Layout = () => {
  return (
    <div className={s.App}>
      <Header />
      <div className={s.content}>
        <Outlet />
      </div>
      <footer className={s.footer}>Copyrighting Tastemaker 2024</footer>
    </div>
  )
}
