import { CustomLink } from "../CustomLink/CustomLink.tsx"
import s from "./Header.module.css"

export const Header = () => {
  return (
    <header className={s.header}>
      <div>LOGO</div>
      <nav className={s.menu}>
        <ul>
          <li>
            <CustomLink to="/">Главная</CustomLink>
          </li>
          <li>
            <CustomLink to="/recipes">Рецепты</CustomLink>
          </li>
          <li>
            <CustomLink to="/my-recipes">Мои рецепты</CustomLink>
          </li>
        </ul>
      </nav>

      <div className="btns">
        <CustomLink to="/add-new-recipe">Добавить рецепт</CustomLink>
        <CustomLink to="/login">Войти</CustomLink>
      </div>
    </header>
  )
}
