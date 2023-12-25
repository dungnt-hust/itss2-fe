import { axiosInstance } from "@/helpers/axiosInstance"
import { api } from "@constants/api"

export class AuthService {
  login(username: string, password: string) {
    return axiosInstance.post<{
      user_info: any
      token: string
    }>(api.auth.login, {
      email: username,
      password,
    })
  }

  register(username: string, password: string, age: number, gender: number) {
    return axiosInstance.post<{
      user_info: any
      token: string
    }>(api.auth.register, {
      email: username,
      password,
      age,
      gender
    })
  }

  // getNonce(address: string) {
  //   return axiosInstance.get<string>(api.auth.getNonce, {
  //     params: {
  //       address,
  //     },
  //   })
  // }

  // login(address: string, sign: string) {
  //   return axiosInstance.post<{
  //     user_info: User
  //     token: string
  //   }>(api.auth.login, {
  //     address,
  //     sign,
  //   })
  // }
}
