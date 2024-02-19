import { Recipe } from "../../../pages/HomePage/HomePage.tsx"
import s from "./RecipeItem.module.css"
export const RecipeItem = ({ title, url, image }: Recipe) => {
  return (
    <div className={s.item}>
      <a href={url} className={s.link}>
        <img src={image} alt={title} className={s.img} />
        <span className={s.title}>{title}</span>
      </a>
    </div>
  )
}
