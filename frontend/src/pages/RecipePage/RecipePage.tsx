import "./RecipePage.css"

import recipePreview from "./../../assets/recipe-example.png"
import { useAppDispatch } from "../../hooks/reduxHooks"
import {
  IRecipe,
  initialRecipeState,
} from "../../store/slices/recipes/recipeSlice"
import { addRecipe, getRecipe } from "../../store/slices/recipes/recipeActions"
import { useEffect, useState } from "react"

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

export const RecipePage = (recipeId: number) => {
  const dispatch = useAppDispatch()

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

  const fetchRecipe = async() => {
    try{
      const gotRecipe = await dispatch(getRecipe({ id: 8 }))
      
      setCurrentRecipe(gotRecipe.payload)
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
      <p className="recipe-title">Картофельные зразы с мясным фаршем</p>
      <br />
      <br />
      <p className="recipe-description">
        Картофельные зразы с мясным фаршем — беспроигрышный вариант, если
        хочется приготовить что-то вкусное, сытное, причем, довольно быстро. Да
        и особых финансовых затрат это блюдо не предполагает! Главное — найти
        для него правильный картофель мучнистых сортов, который хорошо держит
        форму. Немаловажен и выбор фарша: если есть возможность, купите хороший
        кусок мяса и пропустите его через мясорубку самостоятельно. Так вы точно
        будете уверены в качестве начинки! А подать на стол картофельные зразы с
        мясным фаршем можно не только с соусом, но и просто с хорошей густой
        сметаной.
      </p>
      <br />
      <br />
      <img className="recipe-preview" src={recipePreview} />
      <br />
      <br />
      <div className="recipe-double-div">
        <div className="recipe-ingredients-div">
          <p className="recipe-subtitle">ИНГРЕДИЕНТЫ</p>
          <p className="recipe-description">
            1 кг картофеля 1 большая луковица 500 г фарша из говядины или
            свинины 300 мл молока 100 мл жирных сливок 2 яйца 50 г муки 50 г
            муки 15 г сливочного масла 20 г растительного масла
          </p>
          {/* <ul>
            <li className="recipe-description">1 кг картофеля</li>
            <li className="recipe-description">1 большая луковица</li>
            <li className="recipe-description">500 г фарша из говядины или</li>
            <li className="recipe-description">300 мл молока</li>
            <li className="recipe-description">100 мл жирных сливок</li>
            <li className="recipe-description">2 яйца</li>
            <li className="recipe-description">50 г муки</li>
            <li className="recipe-description">15 г сливочного масла</li>
            <li className="recipe-description">20 г растительного масла</li>
          </ul> */}
        </div>
        <div className="recipe-time-div">
          {/* <p className="recipe-time-info">Время приготовления: 40 мин</p> */}
        </div>
      </div>
      <br />
      <br />
      <p className="recipe-subtitle">ПОШАГОВЫЙ РЕЦЕПТ ПРИГОТОВЛЕНИЯ</p>
      <Step
        n={1}
        text={
          "Подготовьте ингредиенты для картофельных зраз. Очистите и очень мелко нарежьте лук. Растопите в сковороде немного масла, положите лук и обжаривайте 5 мин. Добавьте фарш, увеличьте огонь, обжаривайте, разбивая фарш деревянной ложкой, чтобы не слипался в комки, пока не поменяется цвет. Снимите с огня, посолите, поперчите и остудите."
        }
      />
      <Step
        n={2}
        text={
          "Вымойте картофель щеткой и сварите в кипящей подсоленной воде до мягкости (это может занять 15-25 минут). Затем осторожно слейте воду и обдайте клубни холодной водой."
        }
      />
      <Step
        n={3}
        text={
          "Очистите картофель от кожуры, остудите. Натрите на терке, смешайте со взбитыми яйцами, растопленным сливочным маслом (2 ст. л.), солью и перцем. Всыпьте столько муки, чтобы получилось тесто средней густоты (чтобы можно было его лепить)."
        }
      />
      <Step
        n={4}
        text={
          "Мокрыми руками сделайте из картофельной массы несколько небольших круглых лепешей. В центр каждой положите немного мясного фарша и сформируйте круглые котлетки-зразы."
        }
      />
      <Step
        n={5}
        text={
          "Обваляйте зразы в муке и обжарьте в растительном масле под крышкой до румяной корочки с обеих сторон. Одновременно в кастрюльке обжарьте в 3 ст. л. сливочного масла 2 ст. л. муки до бежевого цвета. Влейте молоко, все время помешивая, варите до загустения. Добавьте сливки, посолите, поперчите. Подавайте картофельные зразы с соусом."
        }
      />
    </div>
  )
}
