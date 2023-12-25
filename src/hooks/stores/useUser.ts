import { Service } from "@/services/app.service"
import { storageKeys } from "@constants/storage"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useUser = create<{ token?: string; id?: number; login?: any; reset?: any }>()(
  persist(
    (set, get) => ({
      reset() {
        set({
          token: undefined,
          id: undefined,
        })
      },

      async login({ username, password }: { username: any; password: any }) {
        try {
          const user = (await Service.auth.login(username, password)) as any

          if (user) {
            set({
              token: user?.data?.token,
              id: user?.data?.user_info?.id,
            })
          }
          return true
        } catch (err) {
          return false
        }
      },

      setUser(user: any) {
        set({ ...user })
      },

      async register({ username, password }: { username: any; password: any }) {
        try {
          // const user = (await Service.auth.register(

          // )) as any

          // if (user) {
          //   set({
          //     ...user?.data,
          //   })

          //   return user?.data
          // }
          return false
        } catch (err) {
          return false
        }
      },

      logout() {
        get().reset?.()
      },
    }),
    {
      name: storageKeys.user,
    }
  )
)
