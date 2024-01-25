import { createSlice } from "@reduxjs/toolkit"

interface IUser {
  id: string | null
  email: string | null
  token: string | null
}
const initialState: IUser = {
  email: null,
  id: null,
  token: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email
      state.id = action.payload.id
      state.token = action.payload.token
    },
    removeUser(state) {
      state.email = null
      state.id = null
      state.token = null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions
export const userReducer = userSlice.reducer
