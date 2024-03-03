import { createSlice } from "@reduxjs/toolkit"
import { addRecipe, deleteRecipe, getRecipe } from "./recipeActions"

export interface IRecipe {
  id: number | null
  name: string | null
  description: string | null
  ingredients: string | null
  cooking_instructions: string | null
  cooking_time_in_minutes: number
  image: string | null
}

export const initialRecipeState: IRecipe = {
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
      const gotRecipe = action.payload as unknown as IRecipe

      state.cooking_instructions = gotRecipe.cooking_instructions

      state.description = gotRecipe.description

      state.cooking_time_in_minutes = gotRecipe.cooking_time_in_minutes

      state.image = gotRecipe.image

      state.ingredients = gotRecipe.ingredients

      state.name = gotRecipe.name
    })
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      console.log(action.payload)
    })
    builder.addCase(getRecipe.fulfilled, (state, action) => {
      const gotRecipe = action.payload as unknown as IRecipe

      state.cooking_instructions = gotRecipe.cooking_instructions

      state.description = gotRecipe.description

      state.cooking_time_in_minutes = gotRecipe.cooking_time_in_minutes

      state.image = gotRecipe.image

      state.ingredients = gotRecipe.ingredients

      state.name = gotRecipe.name

      //console.log(state)
    })
  },
})

export const recipeReducer = recipeSlice.reducer
