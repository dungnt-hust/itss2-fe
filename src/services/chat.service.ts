import { axiosInstance } from "@/helpers/axiosInstance"
import { api } from "@constants/api"
import { message } from "antd"

export class ChatService {
  async getGroupList(params: any) {
    return axiosInstance.get(api.chat.groupList, {
      params,
    })
  }

  async getChatList(params: any) {
    return axiosInstance.get(api.chat.chatList, {
      params,
    })
  }

  async getGroupId(params: any) {
    return axiosInstance.get(api.chat.groupGet, {
      params,
    })
  }

  async chat({ group_id, content, image }: { content: string; group_id: number; image?: any }) {
    return axiosInstance.post(api.chat.chat, { group_id, content, image })
  }

  async edit({ chat_id, message, image }: { message: string; chat_id: number; image?: any }) {
    return axiosInstance.put(api.chat.edit, { chat_id, message, image })
  }

  async delete({ chat_id }: { chat_id: number }) {
    try {
      const result = await axiosInstance.put(api.chat.delete, { chat_id })
      return result
    } catch (err: any) {
      message.error(err?.response?.data?.error_msg || err?.response?.data?.error_code || err?.message)
    }
  }
}
