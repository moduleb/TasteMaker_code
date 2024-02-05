import { createAsyncThunk } from "@reduxjs/toolkit"
import { $api } from "../../../http"
import { AuthResponse } from "../../../models/authorization.ts"

interface requestArgs {
  email: string
  password: string
}
export const registerByEmail = createAsyncThunk(
  "registerByEmail",
  async ({ email, password }: requestArgs, { rejectWithValue }) => {
    try {
      const registerRequest = await $api.post("/register", {
        email,
        password,
      })
      if (registerRequest.status !== 201) {
        return rejectWithValue("Пользователь не зарегистрирован")
      }
      const tokenRequest = await $api.post<AuthResponse>("/token/", {
        email,
        password,
      })
      if (tokenRequest.status !== 200) {
        return rejectWithValue("неверные данные пользователя")
      }
      const { access, refresh } = tokenRequest.data
      return { refreshToken: refresh, accessToken: access, email }
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const loginByEmail = createAsyncThunk(
  "loginByEmail",
  async ({ email, password }: requestArgs, { rejectWithValue }) => {
    try {
      const tokenRequest = await $api.post<AuthResponse>("/token/", {
        email,
        password,
      })
      if (tokenRequest.status !== 200) {
        return rejectWithValue("неверные данные пользователя")
      }
      const { access, refresh } = tokenRequest.data
      return { refreshToken: refresh, accessToken: access, email }
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const checkAuth = createAsyncThunk(
  "checkAuth",
  async (access: AuthResponse["access"], { rejectWithValue }) => {
    try {
      const response = await $api.post<Record<"token", string>>(
        "/token/verify/",
        {
          access,
        },
      )
      const { token } = response.data
      return { accessToken: token }
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)
