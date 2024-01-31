import s from "./Button.module.css"
type Props = {
  children: React.ReactNode
  type?: "button" | "reset" | "submit"
  onClick?: (e: React.FormEvent) => void
}
export const Button = ({ children, type, onClick }: Props) => {
  return (
    <button onClick={onClick} className={s.button} type={type}>
      {children}
    </button>
  )
}
