import { useAuth } from "../../hooks/useAuth.ts"
import { Link } from "react-router-dom"
import { Textarea } from "../../components/UI/Textarea/Textarea.tsx"
import { Input } from "../../components/UI/Input/Input.tsx"
import { useInput } from "../../hooks/useInput.ts"
import s from "./NewRecipePage.module.css"

export const NewRecipePage = () => {
  const { isAuth } = useAuth()
  const recipeName = useInput("", { isEmpty: true, maxLength: 150 })
  const recipeDescription = useInput("", { maxLength: 1500 })
  const ingredients = useInput("", { maxLength: 1500, isEmpty: true })

  return !isAuth ? (
    <div>
      Для того, чтобы добавить рецепт вам нужно{" "}
      <Link to="/register" style={{ textDecoration: "underline" }}>
        зарегистрироваться
      </Link>
      . Или{" "}
      <Link to="/login" style={{ textDecoration: "underline" }}>
        авторизуйтесь
      </Link>
      , если уже есть аккаунт{" "}
    </div>
  ) : (
    <div>
      <h2>Добавление нового рецепта</h2>
      <p>
        Поля, отмеченные <span className="star">*</span> звездочкой, обязательны
        к заполнению
      </p>
      <form className={s.form}>
        <div className={s.formBlock}>
          <h3 className={s.title}>
            <span className="star">*</span>Название рецепта
          </h3>
          <Input
            type="text"
            {...recipeName}
            placeholder="Введите название рецепта"
            allowedSymbols={150}
          />
        </div>
        <div className={s.formBlock}>
          <h3 className={s.title}>Описание блюда</h3>
          <Textarea
            {...recipeDescription}
            allowedSymbols={1500}
            placeholder="Введите описание блюда"
            height={335}
          />
        </div>
        <div className={s.formBlock}>
          <h3 className={s.title}>
            <span className="star">*</span>Ингредиенты
          </h3>
          <Textarea
            {...ingredients}
            allowedSymbols={1500}
            placeholder="Введите список ингредиентов и их количество"
            height={335}
            required={true}
          />
        </div>
      </form>
    </div>
  )
}
