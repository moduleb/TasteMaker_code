import s from "./Button.module.css"
import { forwardRef } from "react"
type Props = {
  children: React.ReactNode
  type?: "button" | "reset" | "submit"
  onClick?: (e: React.FormEvent) => void
}
export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, type, onClick }: Props, ref) => {
    return (
      <button onClick={onClick} className={s.button} type={type} ref={ref}>
        {children}
      </button>
    )
  },
)
