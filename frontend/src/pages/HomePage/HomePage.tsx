import mockMainBanner from "../../assets/main-banner.jpg"
import { RecipeList } from "../../components/RecipeCard/RecipeList/RecipeList.tsx"
import s from "./HomePage.module.css"
import { useEffect, useState } from "react"
import { $apiWithoutToken } from "../../http"
import { IRecipe } from "../../store/slices/recipes/recipeSlice.ts"

export const HomePage = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([])

  useEffect(() => {
    $apiWithoutToken.get("/recipes/").then((res) => {
      setRecipes(res.data)
    })
  }, [])

  return (
    <div>
      <img
        src={mockMainBanner}
        alt="Изображение блюда"
        className={s.mainBanner}
      />
      <RecipeList recipes={recipes} />
    </div>
  )
}
