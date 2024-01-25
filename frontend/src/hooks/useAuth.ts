import { useAppSelector } from "./reduxHooks"

export const useAuth = () => {
  const { id, email, token } = useAppSelector((state) => state.user)
  return {
    isAuth: !!email,
    token,
    id,
  }
}
