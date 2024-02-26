import s from "./UploadInput.module.css"
import { ChangeEventHandler, MutableRefObject, useRef } from "react"

interface Props {
  uploadFile: (file: File) => void
}

export const UploadInput = ({ uploadFile }: Props) => {
  // const [file, setFile] = useState<null | File>(null)
  const preview: MutableRefObject<null | HTMLImageElement> = useRef(null)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const reader = new FileReader()
      console.log(reader)
      reader.onload = () => {
        console.log(1)
        if (preview.current) {
          preview.current.src = reader.result
        }
      }
      reader.readAsDataURL(e.target.files[0])
      uploadFile(e.target.files[0])
    }
  }

  return (
    <label>
      <input type="file" onChange={onChange} />
      <img src="" ref={preview} alt="" />
    </label>
  )
}
