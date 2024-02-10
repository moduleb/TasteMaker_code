import { useAppSelector } from "./reduxHooks"

export const useAuth = () => {
  const { email, accessToken } = useAppSelector((state) => state.user)
  return {
    isAuth: !!accessToken,
    accessToken,
    email,
  }
}
