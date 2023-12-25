import { Service } from "@/services/app.service"
import useSWR from "swr"

export interface IUserInfo {
  id: number
  email: any
  mobile: any
  username: any
  address: string
  avatar: string
  full_name: string
  status: number
  last_active: any
  type: number
  referral_code: string
  created_time: string
  updated_time: string
  twitter_id: number
  username_twitter: string
  description: string
  is_actived: number
  location: any
  banner: any
  following: number
  follower: number
  is_follow: any
  holder: number
  holding: number
  is_in_group?: number
  blue_check?: number
  in_group?: number
  in_direct?: number
  price?: number
}

export const useUserInfoSearch = (user: string, isRefreshInterval?: number) => {
  const {
    data: userInfoSearch,
    mutate,
    isLoading: isLoadingUserInfoSearch,
  } = useSWR(
    ["useUserInfoSearch", user],
    async () => {
      if (user) {
        // const result = await Service.user.infoSearch({
        //   search: user,
        // })
        const result = await Service.user.getUserInfo({
            search: user,
          })

        return result
      }
    },
    {
      refreshInterval: isRefreshInterval ?? undefined,
    }
  )

  return {
    userInfoSearch: userInfoSearch as IUserInfo | undefined,
    reloadInfoSearch: mutate,
    isLoadingUserInfoSearch,
  }
}
