import s from "./UploadInput.module.css"
import { ChangeEventHandler, MutableRefObject, useRef, useState } from "react"
import uploadImg from "../../assets/icons/upload.png"

interface Props {
  uploadFile: (file: File) => void
}

export const UploadInput = ({ uploadFile }: Props) => {
  const preview: MutableRefObject<null | HTMLImageElement> = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const image = e.target.files[0]
      if (image.size > 2e6) {
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        setIsLoaded(true)
        if (preview.current) {
          if (typeof reader.result === "string") {
            preview.current.src = reader.result
          }
        }
      }
      reader.onerror = () => {
        setIsLoaded(false)
      }
      reader.readAsDataURL(image)
      uploadFile(image)
    }
  }

  return (
    <div className={s.wrapper}>
      <label className={isLoaded ? s.labelLoaded : s.label}>
        <input
          className={s.input}
          type="file"
          onChange={onChange}
          accept="image/jpeg, image/png"
        />
        <div className={s.loadBtn}>
          <span>Загрузить фотографию </span>
          <img src={uploadImg} alt="загрузить фотографию" />
        </div>
        <img src="" className={s.image} ref={preview} alt="" />
      </label>
      <p className={s.p}>
        <span className="star">*</span>Формат фотографии должен быть JPEG,PNG,
        размер - до 2 МБ
      </p>
    </div>
  )
}
