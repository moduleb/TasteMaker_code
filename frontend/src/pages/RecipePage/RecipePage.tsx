import "./RecipePage.css"

import recipePreview from "./../../assets/recipe-example.png"
import { useAppDispatch } from "../../hooks/reduxHooks"
import {
  IRecipe,
  initialRecipeState,
} from "../../store/slices/recipes/recipeSlice"
import { addRecipe, getRecipe } from "../../store/slices/recipes/recipeActions"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

function Step(props) {
  return (
    <>
      {/* <br />
      <br /> */}
      {/* <p className="recipe-subtitle">Шаг {props.n}</p> */}
      <p className="recipe-description">{props.text}</p>
    </>
  )
}

export const RecipePage = () => {
  const dispatch = useAppDispatch()

  const recipe_id = useParams()

  const [currentRecipe, setCurrentRecipe] = useState<IRecipe>()

  const recipeSelector = useSelector((state: RootState) => state.recipe)

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const data = new FormData()

      data.append("name", "Карбонара")
      data.append("description", "Вкуснейшее итальянское блюдо")
      data.append("ingredients", "Макароны, сливки, бекон, грибы, лук, сыр")
      data.append("cooking_time_in_minutes", "60")
      data.append(
        "cooking_instructions",
        "Смешайте сыр со сливками в блендере\nОбжарьте грибы, бекон и лук\nОтварите макараноны\nВсё перемешайте",
      )
      data.append("image", event.target.files[0])

      dispatch(addRecipe(data))
    }
  }

  const fetchRecipe = async () => {
    try {
      await dispatch(getRecipe(recipe_id))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [])

  return (
    <div className="main-container">
      {/* <input type="file" onChange={onImageChange} /> */}
      <p className="recipe-title">{recipeSelector.name}</p>
      <br />
      <br />
      <p className="recipe-description">
        {recipeSelector.description}
      </p>
      <br />
      <br />
      <img className="recipe-preview" src={recipeSelector.image} />
      <br />
      <br />
      <div className="recipe-double-div">
        <div className="recipe-ingredients-div">
          <p className="recipe-subtitle">ИНГРЕДИЕНТЫ</p>
          <p className="recipe-description">
            {recipeSelector.cooking_instructions}
          </p>
        </div>
        <div className="recipe-time-div">
          {/* <p className="recipe-time-info">Время приготовления: 40 мин</p> */}
        </div>
      </div>
      <br />
      <br />
      <p className="recipe-subtitle">ПОШАГОВЫЙ РЕЦЕПТ ПРИГОТОВЛЕНИЯ</p>
      <Step n={1} text={recipeSelector.cooking_instructions} />
    </div>
  )
}
