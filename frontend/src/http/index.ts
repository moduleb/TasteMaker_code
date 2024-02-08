import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { AuthResponse } from "../models/authorization.ts"
export const API_URL = "/api"

interface AxiosErrorType extends AxiosError {
  config: AxiosConfigType
}

interface AxiosConfigType extends InternalAxiosRequestConfig {
  _isRetry: boolean
}

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
  async (error: AxiosErrorType) => {
    const originalRequest = error.config
    if (
      error.response?.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.post<AuthResponse>(
          `${API_URL}/token/refresh/`,
          { refresh: localStorage.getItem("refresh") },
        )
        const { access } = response.data
        localStorage.setItem("access", access)
        originalRequest.headers.Authorization = `Bearer ${access}`
        originalRequest.data = { ...originalRequest.data, token: access }
        return $api.request(originalRequest)
      } catch (e) {
        console.log("пользователь не авторизован")
      }
    }
    throw error
  },
)
