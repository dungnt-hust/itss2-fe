/* eslint-disable @next/next/no-img-element */
import { ImagesPreview } from "@/@interfaces/file"
import LayoutApp from "@/app/Layout"
import { InputChat, LeftChatText, MemberItem, RightChatText } from "@/components/chat/chatComponents"
import EmptyData from "@/components/empty"
// import { RightComponent } from "@/components/right/RightComponent"
import { CHAT_LIMIT } from "@/constants/app"
import { useWebsocket } from "@/hooks/socket/useWebsocket"
import { useUser } from "@/hooks/stores/useUser"
//import { ProtectedLayout } from "@/layout/common-layout"
import { Service } from "@/services/app.service"
import { sleep } from "@/utils/promise"
import { isEmpty } from "lodash"

import moment from "moment"
import { useRouter } from "next/router"
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import useSWR from "swr"
import { twMerge } from "tailwind-merge"
import { useDebounce } from "use-debounce"

const ChatPage = () => {
  const [inputValue, setInputValue] = useState("")
  const [searchText, setSearchText] = useState("")
  const [debouncedSearch] = useDebounce(searchText, 500)
  const [chatTotal, setChatTotal] = useState(-1)
  const [type, setType] = useState(2)
  const [editCurrent, setEditCurrent] = useState<any>()
  const [editCurrentChange, setEditCurrentChange] = useState<any>()
  const [groupCurrent, setGroupCurrent] = useState<any>()
  const [isDone, setIsDone] = useState(false)
  const [offset, setOffset] = useState(0)
  const [messageHistory, setMessageHistory] = useState<any>([])
  const [isSendingChat, setIsSendingChat] = useState(false)
  const [imagesPreview, setImagesPreview] = useState<ImagesPreview>([])

  console.log('check', messageHistory)

  const { user_info } = useUser()
  const router = useRouter()
  const { id, type: typeQuery } = router.query as any
  const { sendJsonMessage, sendMessage, readyState, lastMessage, lastJsonMessage, getWebSocket } = useWebsocket()

  useEffect(() => {
    if (typeQuery) {
      setType(typeQuery)
    }
  }, [typeQuery])

  useEffect(() => {
    addMessage()
  }, [lastMessage, setMessageHistory])

  useEffect(() => {
    if (editCurrent) {
      setInputValue(editCurrent.message ?? "")
      setEditCurrentChange(editCurrent)
    }
  }, [editCurrent])

  const chatBoxRef = useRef<HTMLDivElement>(null)
  const chatBoxScrollRef = useRef<HTMLDivElement>(null)

  const addMessage = async () => {
    if (lastMessage !== null) {
      const lastMessageData = JSON.parse(lastMessage.data)
      if (lastMessageData.type == "new_chat" && lastMessageData.data?.group_id == groupCurrent?.id) {
        setMessageHistory((prev: any) => prev.concat(lastMessageData.data))
        await sleep(100)
        setIsSendingChat(false)
        chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight + 100 })
      }
      if (
        (lastMessageData.type == "delete_chat" || lastMessageData.type == "edit_chat") &&
        lastMessageData.data?.group_id == groupCurrent?.id
      ) {
        setIsSendingChat(false)
        setMessageHistory(
          messageHistory.map((value: any) =>
            value.id !== lastMessageData.data.id ? value : { ...lastMessageData.data }
          )
        )
      }
    }
  }

  const { data: groupList } = useSWR(["ChatPage", "getGroupList", debouncedSearch], async () => {
    const res = await Service.chat.getGroupList({ search: debouncedSearch })
    return res.data
  })


  useSWR(["ChatPage", "getGroupId", debouncedSearch, id], async () => {
    if (!groupCurrent && id) {
      const res = await Service.chat.getGroupId({ id })
      if (res.data) {
        setGroupCurrent(res.data)
      }
    }
  })

  useSWR(["ChatPage", "getChatList", router, offset, groupCurrent], async () => {
    if (!groupCurrent) {
      return
    }
    let t = 0
    while (offset - CHAT_LIMIT * t > messageHistory.length) {
      t++
    }
    if (t > 0) {
      setOffset(offset - CHAT_LIMIT * t)
      return
    }
    if (chatTotal == -1 || (messageHistory.length < chatTotal && groupCurrent)) {
      const res = await Service.chat.getChatList({
        group_id: groupCurrent?.id,
        order_by: "created_time",
        reverse: true,
        offset,
        limit: CHAT_LIMIT,
      })
      chatBoxRef.current?.scrollTo({ top: 200, behavior: "smooth" })
      setMessageHistory(res.data.data.reverse().concat(messageHistory))
      setChatTotal(res.data.total)
    }
  })

  console.log(
    120 +
    document.getElementsByClassName("inputchat")?.[0]?.clientHeight +
    (document.getElementsByClassName("editchat")?.[0]?.clientHeight ?? 0)
  )

  const handleChat = async () => {
    if (isSendingChat || (inputValue.length == 0 && imagesPreview.length == 0)) {
      return
    }

    setIsSendingChat(true)
    let listImage = [] as any
    const listUpload = [] as any
    imagesPreview.forEach((element) => {
      listUpload.push(Service.file.upload(element.file))
    })
    listImage = await Promise.all(listUpload)
    const res = await Service.chat.chat({
      group_id: groupCurrent.id,
      content: inputValue,
      image: isEmpty(listImage) ? undefined : listImage,
    })
    setInputValue("")
    setImagesPreview([])
  }

  const handleEdit = async () => {
    if (isSendingChat) {
      return
    }
    setIsSendingChat(true)
    let listImage = [] as any
    const listUpload = [] as any
    imagesPreview.forEach((element) => {
      listUpload.push(Service.file.upload(element.file))
    })
    listImage = await Promise.all(listUpload)
    if (editCurrentChange?.image?.length) {
      listImage = listImage.concat(editCurrentChange?.image)
    }
    const res = await Service.chat.edit({
      chat_id: editCurrent.id,
      message: inputValue,
      image: isEmpty(listImage) ? undefined : listImage,
    })
    setEditCurrent(undefined)
    setEditCurrentChange(undefined)
    setInputValue("")
    setImagesPreview([])
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio == 1) {
          setOffset((offset) => {
            return offset + CHAT_LIMIT
          })
        }
      })
    },
    {
      threshold: 1,
    }
  )

  useEffect(() => {
    const getID = async () => {
      if (groupCurrent || isDone) {
        return
      }
      if (groupList && id && searchText.length == 0) {
        const groupId = groupList?.data?.find((value: any) => value.id == id)
        if (groupId) {
          setMessageHistory([])
          setOffset(0)
          setGroupCurrent(groupId)
          await sleep(1000)
          chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight + 100 })
          setIsDone(true)
        }
      }
    }
    getID()
  }, [id, groupList, searchText])

  useEffect(() => {
    if (chatBoxScrollRef.current && chatTotal > -1) {
      observer.observe(chatBoxScrollRef.current)
    }
  }, [chatBoxScrollRef, chatTotal])

  return (
    <>
      <div className="container-main relative pb-10 max-sm:h-[calc(100vh_-_4.5rem)] overflow-hidden">
        <div className={twMerge("max-w-1224 flex gap-8", groupCurrent && " max-sm:px-0")}>
          <div className="flex-[1.8]">
            <p className={twMerge("title mt-6 mb-4 max-sm:mb-2", groupCurrent && "max-sm:hidden")}>Chat</p>
            <div
              className={twMerge(
                "bg-white dark:bg-zinc-900 rounded-2xl grid grid-cols-[1fr_1.3fr] max-sm:grid-cols-1 max-sm:bg-transparent",
                !groupCurrent && "grid-cols-1"
              )}
            >
              <div
                className={twMerge("pt-6  max-sm:border-none max-sm:py-0", groupCurrent && "max-sm:hidden border-r")}
              >
                <div className="px-6 max-sm:px-0">
                  <div className="flex items-center mb-4 gap-6">
                    <div
                      className={twMerge(
                        "text-sm text-zinc-500 font-medium cursor-pointer",
                        type == 2 && "text-primary-500"
                      )}
                      onClick={() => {
                        setType(2)
                        router.replace({
                          query: {
                            ...router.query,
                            type: 2,
                          },
                        })
                        setSearchText("")
                      }}
                    >
                      Personal
                    </div>
                    <div
                      className={twMerge(
                        "text-sm text-zinc-500 font-medium cursor-pointer",
                        type == 1 && "text-primary-500"
                      )}
                      onClick={() => {
                        setType(1)
                        router.replace({
                          query: {
                            ...router.query,
                            type: 1,
                          },
                        })
                        setSearchText("")
                      }}
                    >
                      Family
                    </div>
                  </div>
                  <div className="relative mb-3.5">
                    <input
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      type="text"
                      className="w-full py-2 pl-9 pr-3 border-zinc-300 dark:text-white dark:bg-transparent dark:border-zinc-800 border border-solid outline-none shadow-none rounded-3xl"
                      placeholder="Search"
                    />
                    <img src="/icons/icon-search.png" alt="" className="absolute top-1/2 left-2 -translate-y-1/2" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 max-sm:bg-white max-sm:rounded-2xl max-h-[calc(55vh_+_4.6rem)] overflow-auto custom-scroll">
                  {groupList?.data.map((value: any, index: any) => (
                    <MemberItem
                      type={type}
                      key={index}
                      data={value}
                      setGroupCurrent={async () => {
                        if (groupCurrent?.id !== value.id) {
                          setMessageHistory([])
                          setOffset(0)
                          setGroupCurrent(value)
                          router.replace({
                            query: {
                              ...router.query,
                              id: value.id,
                            },
                          })
                          setInputValue("")
                          setImagesPreview([])
                          setChatTotal(-1)
                          await sleep(500)
                          chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight + 100 })
                        }
                      }}
                    />
                  ))}
                  {groupList?.data.length == 0 && (
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 flex flex-col gap-6">
                      <EmptyData />
                    </div>
                  )}
                </div>
              </div>
              <div
                className={twMerge(
                  "flex flex-col max-sm:h-[calc(100vh_-_4rem)]",
                  !groupCurrent && "w-0 h-0 overflow-hidden"
                )}
              >
                <div className="flex items-center justify-between py-4 max-sm:py-3 px-6 border-b border-solid border-zinc-300 max-sm:bg-white">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setGroupCurrent(undefined)}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={twMerge("sm:hidden cursor-pointer", !groupCurrent && "max-sm:hidden")}
                    >
                      <path
                        d="M20 12H4M4 12L10 18M4 12L10 6"
                        stroke="#09090B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <img
                      src={
                        groupCurrent?.avatar
                          ? groupCurrent?.avatar
                          : user_info?.id !== groupCurrent?.a_id
                            ? groupCurrent?.a_avatar
                            : groupCurrent?.b_avatar ?? "/dummy/rectangle913.png"
                      }
                      className="w-12 max-sm:h-10 h-12 max-sm:w-10 rounded-full object-cover cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/profile/?user=${groupCurrent?.avatar
                            ? groupCurrent?.name
                            : user_info?.id !== groupCurrent?.a_id
                              ? groupCurrent?.a_name
                              : groupCurrent?.b_name
                          }`
                        )
                      }
                      alt=""
                    />
                    <div>
                      <div
                        className="text-black text-lg font-medium max-sm:text-sm cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/profile/?user=${groupCurrent?.avatar
                              ? groupCurrent?.name
                              : user_info?.id !== groupCurrent?.a_id
                                ? groupCurrent.a_name
                                : groupCurrent.b_name
                            }`
                          )
                        }
                      >
                        {groupCurrent?.avatar
                          ? groupCurrent?.name
                          : user_info?.id !== groupCurrent?.a_id
                            ? groupCurrent?.a_name
                            : groupCurrent?.b_name}
                      </div>
                      {groupCurrent?.member && (
                        <div className="text-sm text-zinc-500 font-medium max-sm:text-xs">
                          Members: <span className="text-zinc-950">{groupCurrent?.member ?? "_"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-6 pr-0 flex flex-col gap-6 flex-1 md:pb-2 max-sm:bg-slate-50">
                  <div
                    className="overflow-y-scroll transition-all duration-500 pt-2 md:h-[55vh] h-[calc(100vh_-_13rem)] pr-2 scrollbar scrollbar-w-1 scrollbar-track-gray-300 scrollbar-thumb-gray-400 scrollbar-thumb-rounded scroll-smooth"
                    ref={chatBoxRef}
                    style={{
                      height: `calc(100vh - ${120 +
                        document.getElementsByClassName("inputchat")?.[0]?.clientHeight +
                        (document.getElementsByClassName("editchat")?.[0]?.clientHeight ?? 0)
                        }px)`,
                    }}
                  >
                    {messageHistory.length < chatTotal && groupCurrent && (
                      <div className="h-fit flex justify-center">
                        <img src="/icons/loadingchat.svg" alt="" />
                      </div>
                    )}
                    <div ref={chatBoxScrollRef}></div>
                    {messageHistory?.map((value: any, index: any, arr: any) => {
                      if (user_info?.address == value.user_address) {
                        if (
                          arr[index + 1] &&
                          arr[index + 1]?.user_address == user_info?.address &&
                          moment(arr[index + 1]?.created_time).valueOf() - moment(value?.created_time).valueOf() <
                          300000
                        ) {
                          return (
                            <RightChatText
                              setEditCurrent={setEditCurrent}
                              data={value}
                              key={`${value.id} + ${index} + ${"isNotShowTime"}`}
                              isNotShowTime
                            />
                          )
                        }
                        return (
                          <RightChatText setEditCurrent={setEditCurrent} data={value} key={`${value.id} + ${index}`} />
                        )
                      }
                      if (
                        arr[index + 1] &&
                        arr[index + 1]?.user_address == value?.user_address &&
                        moment(arr[index + 1]?.created_time).valueOf() - moment(value?.created_time).valueOf() < 300000
                      ) {
                        return (
                          <LeftChatText
                            data={value}
                            key={`${value.id} + ${index} + ${"isNotShowTime"}`}
                            isNotShowTime
                          />
                        )
                      }
                      return <LeftChatText data={value} key={`${value.id} + ${index}`} />
                    })}
                  </div>
                </div>
                {editCurrent && (
                  <div className="px-6 py-2 bg-[#EFEEFD] text-zinc-500 font-medium flex items-center justify-between editchat">
                    <div className="h-full w-fit inline-block border-l pl-6 border-solid border-primary-500">
                      {editCurrent?.image && (
                        <div className="flex justify-end">
                          {editCurrent?.image?.map((value: any) => (
                            <img key={value} src={value} className="rounded-lg w-16" alt="" />
                          ))}
                        </div>
                      )}
                      {editCurrent?.message}
                    </div>
                    <img
                      src="/icons/remove.svg"
                      alt=""
                      className="cursor-pointer"
                      onClick={() => {
                        setEditCurrent(undefined)
                        setEditCurrentChange(undefined)
                        setInputValue("")
                      }}
                    />
                  </div>
                )}
                <InputChat
                  inputValue={inputValue}
                  onSend={editCurrent ? handleEdit : handleChat}
                  setInputValue={setInputValue}
                  imagesPreview={imagesPreview}
                  setImagesPreview={setImagesPreview}
                  editCurrent={editCurrentChange}
                  setEditCurrent={setEditCurrentChange}
                />
              </div>
            </div>
          </div>
          {/* <div className="flex-1 max-md:hidden mt-6">
            <RightComponent />
          </div> */}
        </div>
      </div>
      {/* {!groupCurrent && <FooterMobile />} */}
    </>
  )
}

ChatPage.getLayout = (page: ReactElement): ReactNode => (
  //<ProtectedLayout>
  <LayoutApp>{page}</LayoutApp>
  //</ProtectedLayout>
)

export default ChatPage
