import { useEffect, useState } from "react"
import {
  validateEmail,
  validatePassword,
} from "../utils/validation/validation.ts"
import { Validations } from "../models/validations.ts"

export const useValidation = (value: string, validations: Validations) => {
  const [isEmpty, setIsEmpty] = useState(true)
  const [minLengthError, setMinLengthError] = useState("")
  const [maxLengthError, setMaxLengthError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [validInput, setValidInput] = useState(false)

  useEffect(() => {
    for (const validation in validations) {
      const validationValue = validations[validation as keyof Validations]
      if (validationValue === undefined) continue

      switch (validation) {
        case "minLength":
          if (value.length < +validationValue) {
            setMinLengthError(
              `Поле должно содержать больше ${validationValue} символов`,
            )
          } else {
            setMinLengthError("")
          }
          break
        case "maxLength":
          if (value.length > +validationValue) {
            setMaxLengthError(
              `Поле должно содержать меньше ${validationValue} символов`,
            )
          } else {
            setMaxLengthError("")
          }
          break
        case "isEmpty":
          if (value) {
            setIsEmpty(false)
          } else {
            setIsEmpty(true)
          }
          break
        case "isEmail":
          if (validateEmail(value)) {
            setEmailError("")
          } else {
            setEmailError("Некорректный email")
          }
          break
        case "isPassword":
          setPasswordError(validatePassword(value))
          break
      }
    }
  }, [value])

  useEffect(() => {
    if (
      isEmpty ||
      maxLengthError ||
      minLengthError ||
      emailError ||
      passwordError
    ) {
      setValidInput(false)
    } else {
      setValidInput(true)
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError, passwordError])

  return {
    maxLengthError,
    minLengthError,
    isEmpty,
    emailError,
    passwordError,
    validInput,
  }
}

export type useValidationReturnType = ReturnType<typeof useValidation>
