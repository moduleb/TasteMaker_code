import s from "./Header.module.css"
import { Container } from "../UI/Container/Container.tsx"
import { Button } from "../UI/Button/Button.tsx"
import { Link } from "react-router-dom"
import Logo from "../../assets/logo.png"

export const Header = () => {
  return (
    <div className={s.headerWrap}>
      <Container>
        <header className={s.header}>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <nav className={s.menu}>
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/recipes">Рецепты</Link>
              </li>
              <li>
                <Link to="/my-recipes">Мои рецепты</Link>
              </li>
            </ul>
          </nav>

          <div className={s.btns}>
            <Button>
              <Link to="/add-new-recipe">Добавить рецепт</Link>
            </Button>
            <Button>
              <Link to="/login">Войти</Link>
            </Button>
          </div>
        </header>
      </Container>
    </div>
  )
}
