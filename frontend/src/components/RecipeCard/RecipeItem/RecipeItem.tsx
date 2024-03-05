import { Recipe } from "../../../pages/HomePage/HomePage.tsx"
import s from "./RecipeItem.module.css"
import { IRecipe } from "../../../store/slices/recipes/recipeSlice.ts"
export const RecipeItem = ({ name, image, id }: IRecipe) => {
  return (
    <div className={s.item}>
      <a href={`/recipes/${id}`} className={s.link}>
        <img src={image || ""} alt={name || ""} className={s.img} />
        <span className={s.title}>{name}</span>
      </a>
    </div>
  )
}
