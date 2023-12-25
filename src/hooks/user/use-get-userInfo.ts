import { Service } from "@/services/app.service"
import useSWR from "swr"
import { useUser } from "../stores/useUser"

const useGetUserInfo = () => {
  const { token, id } = useUser()

  const { data: userInfo, mutate: refreshUserInfo } = useSWR(["get-user-info", token, id], async () => {
    if (!id || !token) return
    const res = await Service.user.getUserInfo({ user_id: id })
    return res?.data
  })

  return { userInfo, refreshUserInfo }
}

export default useGetUserInfo
