import { useAuth } from "../../hooks/useAuth.ts"
import { Link } from "react-router-dom"
import { Textarea } from "../../components/UI/Textarea/Textarea.tsx"
import { Input } from "../../components/UI/Input/Input.tsx"
import { useInput } from "../../hooks/useInput.ts"
import s from "./NewRecipePage.module.css"
import { Button } from "../../components/UI/Button/Button.tsx"
import { UploadInput } from "../../components/UploadInput/UploadInput.tsx"
import { FormEventHandler, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts"
import FormData from "form-data"
import { IRecipe } from "../../store/slices/recipes/recipeSlice.ts"
import { addRecipe } from "../../store/slices/recipes/recipeActions.ts"

export const NewRecipePage = () => {
  const { isAuth } = useAuth()
  const dispatch = useAppDispatch()
  const recipe = useAppSelector((state) => state.recipe)

  const recipeName = useInput("", { isEmpty: true, maxLength: 150 })
  const recipeDescription = useInput("", { maxLength: 1500 })
  const recipeIngredients = useInput("", { maxLength: 1500, isEmpty: true })
  const [imageFile, setImageFile] = useState<null | File>(null)
  const recipesSteps = useInput("", { maxLength: 1500, isEmpty: true })
  const [error, setError] = useState("")

  const uploadFile = (file: File) => {
    if (file) {
      setImageFile(file)
    }
  }

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    if (
      recipeName.validInput &&
      recipesSteps.validInput &&
      recipeIngredients.validInput &&
      imageFile
    ) {
      setError("")
      const data = new FormData()
      data.append("name", recipeName.value)
      data.append("description", recipeDescription.value)
      data.append("ingredients", recipeIngredients.value)
      data.append("cooking_instructions", recipesSteps.value)
      data.append("image", imageFile)
      data.append("cooking_time_in_minutes", 123)
      dispatch(addRecipe(data))
    } else {
      setError("ошибка")
    }
  }

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
      <form className={s.form} onSubmit={onSubmit}>
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
          <UploadInput uploadFile={uploadFile} />
        </div>
        <div className={s.formBlock}>
          <h3 className={s.title}>
            <span className="star">*</span>Ингредиенты
          </h3>
          <Textarea
            {...recipeIngredients}
            allowedSymbols={1500}
            placeholder="Введите список ингредиентов и их количество"
            height={335}
            required={true}
          />
        </div>

        <h3 className={s.title}>
          <span className="star">*</span>Рецепт приготовления
        </h3>
        <Textarea
          {...recipesSteps}
          allowedSymbols={1500}
          height={640}
          placeholder="Введите шаги приготовления блюда"
        />

        <Button type="submit">Опубликовать</Button>
      </form>
      {error}
      {recipe && recipe.name}
    </div>
  )
}
