import { useAuth } from "../../hooks/useAuth.ts"
import { Link } from "react-router-dom"
import mockMainBanner from "../../assets/main-banner.jpg"
import mockRecipeItemImage from "../../assets/dish-photo.jpg"
import { RecipeList } from "../../components/RecipeCard/RecipeList/RecipeList.tsx"
import s from "./HomePage.module.css"

const mockRecipes = [
  {
    image: mockRecipeItemImage,
    title: "Картофельные зразы с мясным фаршем",
    url: "#",
  },
  {
    image: mockRecipeItemImage,
    title: "Картофельные зразы с мясным фаршем",
    url: "#",
  },
  {
    image: mockRecipeItemImage,
    title: "Картофельные зразы с мясным фаршем",
    url: "#",
  },
  {
    image: mockRecipeItemImage,
    title: "Картофельные зразы с мясным фаршем",
    url: "#",
  },
  {
    image: mockRecipeItemImage,
    title: "Картофельные зразы с мясным фаршем",
    url: "#",
  },
  {
    image: mockRecipeItemImage,
    title: "Картофельные зразы с мясным фаршем",
    url: "#",
  },
  {
    image: mockRecipeItemImage,
    title: "Картофельные зразы с мясным фаршем",
    url: "#",
  },
  {
    image: mockRecipeItemImage,
    title: "Картофельные зразы с мясным фаршем",
    url: "#",
  },
  {
    image: mockRecipeItemImage,
    title: "Картофельные зразы с мясным фаршем",
    url: "#",
  },
]

export interface Recipe {
  image: string
  title: string
  url: string
}

export const HomePage = () => {
  // return <Navigate to="/login" />
  const { isAuth } = useAuth()

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
      <RecipeList recipes={mockRecipes} />
    </div>
  )
}
