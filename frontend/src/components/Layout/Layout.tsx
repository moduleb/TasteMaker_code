import { Outlet } from "react-router-dom"
import s from "./Layout.module.css"
import { Header } from "../Header/Header.tsx"
import { Footer } from "../Footer/Footer.tsx"
import { Container } from "../UI/Container/Container.tsx"

export const Layout = () => {
  return (
    <div className={s.App}>
      <Header />
      <div className={s.content}>
        <Container>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </div>
  )
}
