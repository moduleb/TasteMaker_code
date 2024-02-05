import axios from "axios"
import { AuthResponse } from "../models/authorization.ts"
export const API_URL = "/api"

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access")
  if (access) {
    config.headers.Authorization = `Bearer ${access}`
  }
  return config
})

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.post<AuthResponse>(
          `${API_URL}/token/refresh/`,
          { refresh: localStorage.getItem("refresh") },
        )
        const { refresh, access } = response.data
        localStorage.setItem("refresh", refresh)
        localStorage.setItem("access", access)
        return $api.request(originalRequest)
      } catch (e) {
        console.log("пользователь не авторизован")
      }
    }
    throw error
  },
)
