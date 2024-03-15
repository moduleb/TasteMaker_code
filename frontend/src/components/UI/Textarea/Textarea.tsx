import s from "./Textarea.module.css"
import { useValidationReturnType } from "../../../hooks/useValidation.ts"
import { useInputReturnType } from "../../../hooks/useInput.ts"
import { ChangeEventHandler, FocusEventHandler, forwardRef } from "react"
interface Props
  extends useValidationReturnType,
    Omit<useInputReturnType, "onChange" | "onBlur"> {
  placeholder?: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  onBlur: FocusEventHandler<HTMLTextAreaElement>
  allowedSymbols: number
  height: number
  required?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      value,
      placeholder,
      onChange,
      onBlur,
      maxLengthError,
      isEmpty,
      dirty,
      allowedSymbols,
      height,
      required,
    }: Props,
    ref,
  ) => {
    return (
      <label className={s.label}>
        <textarea
          ref={ref}
          cols={30}
          rows={1}
          className={`${s.textarea} ${(maxLengthError || (dirty && isEmpty && required)) && s.error}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          style={{ height: `${height}px` }}
        ></textarea>
        <span className={s.message}>Можно ввести знаков: {allowedSymbols}</span>
        {dirty && isEmpty && required && (
          <span className={s.errorMessage}>
            Поле обязательно для заполнения
          </span>
        )}
        {maxLengthError && (
          <span className={s.errorMessage}>{maxLengthError}</span>
        )}
      </label>
    )
  },
)
