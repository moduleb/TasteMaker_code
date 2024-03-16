import s from "./UploadInput.module.css"
import {
  ChangeEventHandler,
  forwardRef,
  MutableRefObject,
  useRef,
  useState,
} from "react"
import uploadImg from "../../assets/icons/upload.png"

interface Props {
  uploadFile: (file: File) => void
}

export const UploadInput = forwardRef<HTMLInputElement, Props>(
  ({ uploadFile }: Props, ref) => {
    const preview: MutableRefObject<null | HTMLImageElement> = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState("")

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (e.target.files) {
        const image = e.target.files[0]
        if (image.type !== "image/png" && image.type !== "image/jpeg") {
          setError("Разрешается загружать фото в JPG или PNG форматах")
          return
        }
        if (image.size > 2e6) {
          setError("Размер фотографии не должен превышать 2 мб")
          if (preview.current) preview.current.src = ""
          setIsLoaded(false)
          return
        }
        setError("")
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
            ref={ref}
          />
          <div className={s.loadBtn}>
            <span>Загрузить фотографию </span>
            <img src={uploadImg} alt="загрузить фотографию" />
          </div>
          <img src="" className={s.image} ref={preview} alt="" />
        </label>
        {error && <p className={s.error + " " + s.p}>{error}</p>}
        <p className={s.p}>
          <span className="star">*</span>Формат фотографии должен быть JPEG,PNG,
          размер - до 2 МБ
        </p>
      </div>
    )
  },
)
