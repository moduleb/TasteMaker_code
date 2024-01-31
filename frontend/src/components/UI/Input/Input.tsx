import { ChangeEvent } from "react"

type Props = {
  type: "text" | "password" | "email"
  handler: (value: string) => void
  value: string
  placeholder?: string
}
export const Input = ({ type, handler, value, placeholder }: Props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handler(e.target.value)
  }
  return (
    <>
      <input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </>
  )
}
