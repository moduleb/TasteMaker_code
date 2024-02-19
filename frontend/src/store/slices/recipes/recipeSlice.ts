import { createSlice } from "@reduxjs/toolkit"
import { addRecipe, deleteRecipe } from "./recipeActions"

export interface IRecipe {
  id: number | null
  name: string | null
  description: string | null
  ingredients: string | null
  cooking_instructions: string | null
  cooking_time_in_minutes: number
  image: string | null
}

const initialRecipeState: IRecipe = {
  id: null,
  name: null,
  description: null,
  ingredients: null,
  cooking_instructions: null,
  cooking_time_in_minutes: 0,
  image: null,
}

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialRecipeState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      console.log(action.payload)
    })
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      console.log(action.payload)
    })
  },
})

export const recipeReducer = recipeSlice.reducer
