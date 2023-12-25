import { axiosInstance } from "@/helpers/axiosInstance"
import { api, REST_METHOD } from "@constants/api"

export class FileService {
  async upload(file: string | Blob) {
    try {
      const fmData = new FormData()
      fmData.append("file", file)

      const res = await axiosInstance.request({
        method: REST_METHOD.POST,
        url: `${api.file.upload}`,
        data: fmData,
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (res?.data) {
        return res?.data
      }
    } catch (err) {
      return null
    }
  }
}
