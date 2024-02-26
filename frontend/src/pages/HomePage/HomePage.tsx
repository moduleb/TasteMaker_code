import { useAuth } from "../../hooks/useAuth.ts"
import mockMainBanner from "../../assets/main-banner.jpg"
import { RecipeList } from "../../components/RecipeCard/RecipeList/RecipeList.tsx"
import s from "./HomePage.module.css"
import { useEffect, useState } from "react"
import { $api } from "../../http"
import { IRecipe } from "../../store/slices/recipes/recipeSlice.ts"

export const HomePage = () => {
  // return <Navigate to="/login" />
  const { isAuth } = useAuth()
  const [recipes, setRecipes] = useState<IRecipe[]>([])

  useEffect(() => {
    $api.get("/recipes/").then((res) => {
      setRecipes(res.data)
    })
  }, [])

  return (
    <div>
      {/*{isAuth ? (*/}
      {/*  "вы залогинены"*/}
      {/*) : (*/}
      {/*  <Link to="/login">чтобы залогиниться перейдите по ссылке</Link>*/}
      {/*)}*/}
      <img
        src={mockMainBanner}
        alt="Изображение блюда"
        className={s.mainBanner}
      />
      <RecipeList recipes={recipes} />
    </div>
  )
}
