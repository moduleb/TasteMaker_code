import s from "./Form.module.css"
import { useRef } from "react"

interface FormProps {
  title: string
  children?: React.ReactNode
  handleSubmit: () => void
  styles?: string
}
export const Form = ({
  title,
  children,
  handleSubmit,
  styles = "",
}: FormProps) => {
  const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null)
  const onSubmit = (e: React.FormEvent) => {
    if (formRef.current !== null) {
      const submitBtn: HTMLElement | null = formRef.current.querySelector(
        'button[type="submit"]',
      )
      if (submitBtn) {
        submitBtn.focus()
      }
    }
    e.preventDefault()
    handleSubmit()
  }

  return (
    <form onSubmit={onSubmit} className={`${s.form} ${styles}`} ref={formRef}>
      <h2 className={s.formTitle}>{title}</h2>
      <div className={s.formContent}>{children}</div>
    </form>
  )
}
