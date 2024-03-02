import { useValidationReturnType } from "../hooks/useValidation.ts"
import { useInputReturnType } from "../hooks/useInput.ts"

interface getErrorMessageProps
  extends Omit<useValidationReturnType, "validInput">,
    Pick<useInputReturnType, "dirty"> {}
export const getErrorMessage = ({
  dirty,
  isEmpty,
  maxLengthError,
  minLengthError,
  passwordError,
  emailError,
}: getErrorMessageProps) => {
  if (!dirty) return ""
  if (isEmpty) {
    return "Поле не должно быть пустым"
  }
  return (
    [maxLengthError, minLengthError, passwordError, emailError].find(
      (error) => error,
    ) || ""
  )
}
