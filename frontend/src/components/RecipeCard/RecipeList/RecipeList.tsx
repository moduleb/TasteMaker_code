import { RecipeItem } from "../RecipeItem/RecipeItem.tsx"
import s from "./RecipeList.module.css"
import { IRecipe } from "../../../store/slices/recipes/recipeSlice.ts"

type Props = {
  recipes: IRecipe[]
}
export const RecipeList = ({ recipes }: Props) => {
  return (
    <div className={s.list}>
      {recipes.map((recipe, i) => (
        <RecipeItem {...recipe} key={i} />
      ))}
    </div>
  )
}
