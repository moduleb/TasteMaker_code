import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage"
import { Layout } from "./components/Layout/Layout"
import { RegisterPage } from "./pages/Authorization/RegisterPage/RegisterPage"
import { LoginPage } from "./pages/Authorization/LoginPage/LoginPage"

function App() {
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
