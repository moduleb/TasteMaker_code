import { createAsyncThunk } from "@reduxjs/toolkit"
import { $api, $apiWithoutToken } from "../../../http"
import { AuthResponse } from "../../../models/authorization.ts"
import { AxiosError } from "axios"
import { IUser } from "./userSlice.ts"

interface requestArgs {
  email: string
  password: string
}

export interface ErrorPayload {
  email: [string]
}

export const registerByEmail = createAsyncThunk<
  IUser,
  requestArgs,
  { rejectValue: ErrorPayload }
>(
  "registerByEmail",
  async ({ email, password }: requestArgs, { rejectWithValue }) => {
    try {
      await $apiWithoutToken.post("/register", {
        email,
        password,
      })
      const tokenRequest = await $api.post<AuthResponse>("/token/", {
        email,
        password,
      })

      const { access, refresh } = tokenRequest.data
      return { refreshToken: refresh, accessToken: access, email } as IUser
    } catch (e) {
      const error: AxiosError<ErrorPayload> = e as never
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  },
)

export const loginByEmail = createAsyncThunk(
  "loginByEmail",
  async ({ email, password }: requestArgs, { rejectWithValue }) => {
    try {
      const tokenResponse = await $api.post<AuthResponse>("/token/", {
        email,
        password,
      })
      if (tokenResponse.status !== 200) {
        return rejectWithValue("неверные данные пользователя")
      }
      const { access, refresh } = tokenResponse.data
      return { refreshToken: refresh, accessToken: access, email }
    } catch (e) {
      return rejectWithValue({
        message: "Пользователь с такими данными не найден",
      })
    }
  },
)

export const checkAuth = createAsyncThunk(
  "checkAuth",
  async (access: string, { rejectWithValue }) => {
    try {
      const response = await $api.post<Record<"token", string>>(
        "/token/verify/",
        {
          token: access,
        },
      )
      if (response.status == 200) {
        return { accessToken: access }
      } else {
        return { accessToken: null }
      }
    } catch (e) {
      return rejectWithValue("Токен недействителен или просрочен")
    }
  },
)
