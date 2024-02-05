import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage"
import { Layout } from "./components/Layout/Layout"
import { RegisterPage } from "./pages/Authorization/RegisterPage/RegisterPage"
import { LoginPage } from "./pages/Authorization/LoginPage/LoginPage"
import { useEffect } from "react"
import { useAppDispatch } from "./hooks/reduxHooks.ts"
import { checkAuth } from "./store/slices/authorization/userActions.ts"

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const access = localStorage.getItem("access")
    if (access) {
      dispatch(checkAuth(access))
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
