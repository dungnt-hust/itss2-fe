import { storageKeys } from "@/constants/storage"
import { Service } from "@/services/app.service"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useUser = create<User>()(
  persist(
    (set, get) => ({
      reset() {
        set({
          address: undefined,
          token: undefined,
          user_info: undefined,
          expiredAt: undefined,
          geo: undefined,
          ipAddr: undefined,
        })
      },

      async login({ username, password }: { username: any; password: any }) {
        try {
          const user = (await Service.auth.login(
            username,
            password,
          )) as any

          if (user) {
            set({
              ...user?.data,
            })

            return user?.data
          }
          return false
        } catch (err) {
          return false
        }
      },

      logout() {
        get().reset()
      },

      async refreshUserInfo() {
        const info = await Service.user.getUserInfo({})
        set({
          user_info: {
            ...info?.data,
          },
        })
      },
    }),
    {
      name: storageKeys.user,
    }
  )
)
