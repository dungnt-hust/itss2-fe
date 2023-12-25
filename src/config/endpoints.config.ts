import { EENV, ENV } from "@constants/env"

const API_URLS = {
  [EENV.development]: "http://192.168.11.113:9999",
  [EENV.production]: "",
}
export const CHAT_URLS = {
  [EENV.development]: "wss://192.168.11.113:3000",
}
export const API_URL = API_URLS[ENV]
