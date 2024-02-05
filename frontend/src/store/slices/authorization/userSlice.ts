import { createSlice } from "@reduxjs/toolkit"
import { checkAuth, loginByEmail, registerByEmail } from "./userActions.ts"

interface IUser {
  email: string | null
  accessToken: string | null
  refreshToken: string | null
}
const initialState: IUser = {
  email: null,
  accessToken: null,
  refreshToken: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerByEmail.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken
        state.email = payload.email
        state.refreshToken = payload.refreshToken
        localStorage.setItem("access", payload.accessToken)
        localStorage.setItem("refresh", payload.refreshToken)
        console.log("удачно")
      })
      .addCase(registerByEmail.rejected, (state, action) => {
        console.log(action)
        state.email = null
        state.accessToken = null
        state.refreshToken = null
      })
      .addCase(loginByEmail.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken
        state.email = payload.email
        state.refreshToken = payload.refreshToken
        localStorage.setItem("access", payload.accessToken)
        localStorage.setItem("refresh", payload.refreshToken)
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        console.log(state, action)
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
      })
  },
})

export const userReducer = userSlice.reducer
