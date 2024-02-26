import { ChangeEventHandler, FocusEventHandler, useState } from "react"
import { Validations } from "../models/validations.ts"
import { useValidation } from "./useValidation.ts"

export const useInput = (initialValue: string, validations: Validations) => {
  const [value, setValue] = useState(initialValue)
  const [dirty, setDirty] = useState(false)
  const valid = useValidation(value, validations)

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e,
  ) => {
    setValue(e.target.value)
  }

  const onBlur: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = () => {
    setDirty(true)
  }

  return {
    value,
    dirty,
    onChange,
    onBlur,
    ...valid,
  }
}

export type useInputReturnType = ReturnType<typeof useInput>
