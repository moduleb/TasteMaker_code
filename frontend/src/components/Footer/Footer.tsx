import s from "./Footer.module.css"
import copy from "../../assets/copyright.png"
export const Footer = () => {
  return (
    <footer className={s.footer}>
      <img src={copy} alt="Copyright" />
      <span>Copyrighting Tastemaker 2024</span>
    </footer>
  )
}
