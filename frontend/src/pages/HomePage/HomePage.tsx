import { useAuth } from "../../hooks/useAuth.ts"
import { Link } from "react-router-dom"
import { Container } from "../../components/UI/Container/Container.tsx"

export const HomePage = () => {
  // return <Navigate to="/login" />
  const { isAuth } = useAuth()

  return (
    <Container>
      {isAuth ? (
        "вы залогинены"
      ) : (
        <Link to="/login">чтобы залогиниться перейдите по ссылке</Link>
      )}
    </Container>
  )
}
