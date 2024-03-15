import { useAuth } from "../../hooks/useAuth.ts"
import { Navigate, useNavigate } from "react-router-dom"
import { Textarea } from "../../components/UI/Textarea/Textarea.tsx"
import { Input } from "../../components/UI/Input/Input.tsx"
import { useInput } from "../../hooks/useInput.ts"
import s from "./NewRecipePage.module.css"
import { Button } from "../../components/UI/Button/Button.tsx"
import { UploadInput } from "../../components/UploadInput/UploadInput.tsx"
import { FormEventHandler, useRef, useState } from "react"
import { useAppDispatch } from "../../hooks/reduxHooks.ts"
import FormData from "form-data"
import { addRecipe } from "../../store/slices/recipes/recipeActions.ts"

export const NewRecipePage = () => {
  const { isAuth } = useAuth()
  const dispatch = useAppDispatch()

  const recipeName = useInput("", { isEmpty: true, maxLength: 150 })
  const recipeDescription = useInput("", { maxLength: 1500 })
  const recipeIngredients = useInput("", { maxLength: 1500, isEmpty: true })
  const [imageFile, setImageFile] = useState<null | File>(null)
  const recipesSteps = useInput("", { maxLength: 1500, isEmpty: true })
  const [error, setError] = useState("")

  const recipeNameRef = useRef<HTMLInputElement | null>(null)
  const recipeDescriptionRef = useRef<HTMLTextAreaElement | null>(null)
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const recipeIngredientsRef = useRef<HTMLTextAreaElement | null>(null)
  const recipesStepsRef = useRef<HTMLTextAreaElement | null>(null)
  const submitBtnRef = useRef<HTMLButtonElement>(null)

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
      navigate("/")
    } else {
      // setError("ошибка")
      recipeNameRef.current?.focus()
      recipesStepsRef.current?.focus()
      recipeIngredientsRef.current?.focus()
      submitBtnRef.current?.focus()
      if (!recipeName.validInput) {
        console.log(1)
        recipeNameRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      } else if (!recipesSteps.validInput) {
        console.log(2)
        recipesStepsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      } else if (!recipeIngredients.validInput) {
        console.log(3)
        recipeIngredientsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }

  return !isAuth ? (
    <Navigate to="/login" />
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
            ref={recipeNameRef}
          />
        </div>
        <div className={s.formBlock}>
          <h3 className={s.title}>Описание блюда</h3>
          <Textarea
            {...recipeDescription}
            allowedSymbols={1500}
            placeholder="Введите описание блюда"
            height={335}
            ref={recipeDescriptionRef}
          />
        </div>
        <div className={s.formBlock}>
          <UploadInput uploadFile={uploadFile} ref={uploadInputRef} />
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
            ref={recipeIngredientsRef}
          />
        </div>

        <h3 className={s.title}>
          <span className="star">*</span>Рецепт приготовления
        </h3>
        <Textarea
          {...recipesSteps}
          ref={recipesStepsRef}
          allowedSymbols={1500}
          required={true}
          height={640}
          placeholder="Введите шаги приготовления блюда"
        />

        <Button type="submit" ref={submitBtnRef}>
          Опубликовать
        </Button>
      </form>
      {error}
    </div>
  )
}
