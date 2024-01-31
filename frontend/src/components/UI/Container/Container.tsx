import s from "./Container.module.css"
type Props = {
  children: React.ReactNode
}
export const Container = ({ children }: Props) => {
  return <div className={s.container}>{children}</div>
}
