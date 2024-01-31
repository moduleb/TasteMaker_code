import s from "./Form.module.css"

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
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <form action="#" onSubmit={onSubmit} className={`${s.form} ${styles}`}>
      <h2 className={s.formTitle}>{title}</h2>
      <div className={s.formContent}>{children}</div>
    </form>
  )
}
