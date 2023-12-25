import { CHAT_URLS } from "@/config/endpoints.config"
import { RETRY_CONNECT_ATTEMPT, RETRY_CONNECT_INTERVAL } from "@/constants/app"
import { debounce } from "lodash"
import { useEffect } from "react"
import useWebSocket from "react-use-websocket"
import useSWR from "swr"
import { useUser } from "../stores/useUser"

export const useWebsocket = (init?: boolean) => {
  const { token } = useUser()

  const { sendJsonMessage, sendMessage, readyState, lastMessage, lastJsonMessage, getWebSocket } = useWebSocket(
    CHAT_URLS["development"],
    {
      onOpen: () => {
        console.log("Connection opened.")
        debouncedOnChange()
      },
      onClose: () => {
        console.log("Connection closed.")
      },
      onError: () => {
        console.log("Connection error.")
      },
      shouldReconnect: (closeEvent) => true,
      share: true,
      retryOnError: true,
      reconnectInterval: RETRY_CONNECT_INTERVAL,
      reconnectAttempts: RETRY_CONNECT_ATTEMPT,
    }
  )

  const handleLogin = () => {
    if (init) {
      sendJsonMessage({
        type: "login",
        token,
      })
    }
  }

  const debouncedOnChange = debounce(handleLogin, 500)

  useEffect(() => {
    return () => {
      if (init) {
        getWebSocket && getWebSocket()?.close()
      }
    }
  }, [getWebSocket, init, sendJsonMessage, token])

  useSWR(
    ["ChatPage"],
    () => {
      sendJsonMessage({
        type: "ping",
      })
    },
    {
      refreshInterval: 5000,
    }
  )

  return { sendJsonMessage, sendMessage, readyState, lastMessage, lastJsonMessage, getWebSocket }
}
