import { createSlice } from "@reduxjs/toolkit"
import {
  checkAuth,
  ErrorPayload,
  loginByEmail,
  registerByEmail,
} from "./userActions.ts"

export interface IUser {
  email: string | null
  accessToken: string | null
  refreshToken: string | null
  errorMessage: string | null
}
const initialState: IUser = {
  email: null,
  accessToken: null,
  refreshToken: null,
  errorMessage: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerByEmail.fulfilled, (state, { payload }) => {
        if (payload) {
          state.accessToken = payload.accessToken
          state.email = payload.email
          state.refreshToken = payload.refreshToken
          localStorage.setItem("access", payload.accessToken || "")
          localStorage.setItem("refresh", payload.refreshToken || "")
        }
      })
      .addCase(registerByEmail.rejected, (state, action) => {
        const payload = action.payload as ErrorPayload
        if (payload) {
          state.errorMessage = payload.email[0]
          state.email = null
          state.accessToken = null
          state.refreshToken = null
          localStorage.setItem("access", "")
          localStorage.setItem("refresh", "")
        }
      })
      .addCase(loginByEmail.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken
        state.email = payload.email
        state.refreshToken = payload.refreshToken
        localStorage.setItem("access", payload.accessToken)
        localStorage.setItem("refresh", payload.refreshToken)
      })
      .addCase(loginByEmail.rejected, (state) => {
        state.errorMessage = "Неверные логин или пароль"
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.accessToken = localStorage.getItem("access")
      })
  },
})

export const userReducer = userSlice.reducer
