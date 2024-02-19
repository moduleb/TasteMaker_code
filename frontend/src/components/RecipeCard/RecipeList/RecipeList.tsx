import { Recipe } from "../../../pages/HomePage/HomePage.tsx"
import { RecipeItem } from "../RecipeItem/RecipeItem.tsx"
import s from "./RecipeList.module.css"

type Props = {
  recipes: Recipe[]
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
