import { useAuth } from "../../hooks/useAuth.ts"
import { CustomLink } from "../../components/CustomLink/CustomLink.tsx"

export const HomePage = () => {
  // return <Navigate to="/login" />
  const { isAuth } = useAuth()

  return isAuth ? (
    "вы залогинены"
  ) : (
    <CustomLink to="/login">чтобы залогиниться перейдите по ссылке</CustomLink>
  )
}
