import { createAsyncThunk } from "@reduxjs/toolkit"
import { $api } from "../../../http"
import FormData from "form-data"
import { IRecipe, initialRecipeState } from "./recipeSlice"
import { AxiosError } from "axios"

export interface RecipeRequestArgs {
  id: number
}

interface RecipeErrorPayload {
  name: [string]
}

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipe: FormData) => {
    try {
      const response = await $api.post<IRecipe>("/recipes/", recipe)

      const recipeResponse = response.data

      console.log(recipeResponse)
    } catch (e) {
      console.log(e)
    }
  },
)

export const getRecipe = createAsyncThunk<
  IRecipe,
  RecipeRequestArgs,
  { rejectValue: RecipeErrorPayload }
>(
  "recipe/getRecipe",
  async ({ id }: RecipeRequestArgs, { rejectWithValue }) => {
    try {
      const response = await $api.get<IRecipe>(`/recipes/${id}`)

      const recipeResponse = response.data

      return recipeResponse
    } catch (e) {
      const error: AxiosError<RecipeErrorPayload> = e as never
      if (!error.response) {
        throw error
      }

      return rejectWithValue(error.response.data)
    }
  },
)

export const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async (id: number) => {
    try {
      const response = await $api.delete(`/recipes/${id}`)

      console.log(response)
    } catch (e) {
      console.log(e)
    }
  },
)

// export const addRecipe = createAsyncThunk<
//   IRecipe,
//   RecipeRequestArgs,
//   { rejectValue: RecipeErrorPayload }
// >(
//   "recipes/addRecipe",
//   async (
//     {
//       name,
//       description,
//       ingredients,
//       cooking_instructions,
//       cooking_time_in_minutes,
//       image,
//     }: RecipeRequestArgs,
//     { rejectWithValue },
//   ) => {
//     try{
//         const tokenResponse
//     } catch (e) {
//         const error: AxiosError<RecipeErrorPayload> = e as never
//         if(!error.response){
//             throw error
//         }
//         return rejectWithValue(error.response.data)
//     }
//   },
// )
