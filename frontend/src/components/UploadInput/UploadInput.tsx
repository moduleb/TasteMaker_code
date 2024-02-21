import s from "./UploadInput.module.css"
import { ChangeEventHandler } from "react"

interface Props {
  uploadFile: (file: File) => void
}

export const UploadInput = ({ uploadFile }: Props) => {
  // const [file, setFile] = useState<null | File>(null)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      uploadFile(e.target.files[0])
    }
  }

  return (
    <label>
      <input type="file" onChange={onChange} />
    </label>
  )
}
