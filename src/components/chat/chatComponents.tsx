import { ImagesPreview } from "@/@interfaces/file"
// import { useUser } from "@/hooks/stores/useUserStore"
import { Service } from "@/services/app.service"
import { preventBubbling } from "@/utils/func"
import { getImagesData } from "@/utils/validation"
import { CardInfoPopup } from "@/views/home/CardInfoPopup"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { Button, Dropdown, Image, MenuProps, message, Popover, Tooltip } from "antd"
import moment from "moment"
import { useRouter } from "next/router"
import { ChangeEvent, ClipboardEvent, useEffect, useRef, useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import { twMerge } from "tailwind-merge"
import { useUser } from "@/hooks/stores/useUser"

export enum ChatStatus {
  CREATED = 1,
  DELETED,
  EDITED,
}

export const InputChat = ({
  inputValue,
  setInputValue,
  onSend,
  imagesPreview,
  setImagesPreview,
  editCurrent,
  setEditCurrent,
}: {
  imagesPreview: ImagesPreview
  inputValue: string
  setInputValue: (value: string) => void
  onSend: () => void
  setImagesPreview: (value: ImagesPreview) => void
  editCurrent: any
  setEditCurrent: any
}) => {
  const previewCount = imagesPreview.length
  const [openEmoji, setOpenEmoji] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement> | ClipboardEvent<HTMLInputElement>
  ) => {
    const isClipboardEvent = "clipboardData" in e
    if (isClipboardEvent) {
      const isPastingText = e.clipboardData.getData("text")
      if (isPastingText) return
    }
    const files = isClipboardEvent ? e.clipboardData.files : e.target.files
    const imagesData = getImagesData(files, previewCount)
    if (!imagesData) {
      message.error("Please insert a GIF or set of photos up to 4 (maximum 5Mb/photo)")
      return
    }
    const { imagesPreviewData } = imagesData
    setImagesPreview([...imagesPreview, ...imagesPreviewData])
    inputRef.current?.focus()
  }
  useEffect(() => {
    if (!imagesPreview.length) {
      inputFileRef.current!.value = ""
    }
  }, [imagesPreview])

  //   const removeImage = (targetId: string) => (): void => {
  //     // setSelectedImages(selectedImages.filter(({ id }) => id !== targetId))
  //     setImagesPreview(imagesPreview.filter(({ id }) => id !== targetId))
  //     const result = imagesPreview.find(({ id }) => id === targetId) as any
  //     URL.revokeObjectURL(result.src)
  //     inputFileRef.current!.value = ""
  //   }
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Picker
          data={data}
          onEmojiSelect={(value: any) => {
            setInputValue(inputValue + value.native)
          }}
          onClickOutside={() => {
            setOpenEmoji(false)
          }}
        />
      ),
    },
  ]
  return (
    <div className="px-6 pb-6 flex gap-2 items-end max-sm:bg-white max-sm:pt-4 inputchat">
      <div className="relative flex flex-col flex-1 border-zinc-300 border border-solid rounded-3xl overflow-hidden">
        <div
          className={twMerge("", (imagesPreview.length || editCurrent?.image?.length) && "grid grid-cols-4 p-4 gap-1")}
        >
          {editCurrent?.image?.map((value: any, index: number) => (
            <div className="relative" key={value}>
              <img src={value} alt={value} className="rounded-xl w-full h-full object-cover" />
              <div
                className="btn-normal absolute top-0 right-0 cursor-pointer rounded-full"
                onClick={preventBubbling(() =>
                  setEditCurrent({ ...editCurrent, image: editCurrent?.image.filter((src: any) => src !== value) })
                )}
              >
                <Tooltip title="Remove">
                  <AiFillCloseCircle size={20} className="text-zinc-500 text-xs" />
                </Tooltip>
              </div>
            </div>
          ))}
          {imagesPreview.map(({ id, src, alt }: any, index: number) => (
            <div className="relative" key={id}>
              <img src={src} alt={alt} className="rounded-xl w-full h-full object-cover" />
              <div
                className="btn-normal absolute top-0 right-0 cursor-pointer rounded-full"
              //onClick={preventBubbling(removeImage(id))}
              >
                <Tooltip title="Remove">
                  <AiFillCloseCircle size={20} className="text-zinc-500 text-xs" />
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
        <div>
          <input
            value={inputValue}
            ref={inputRef}
            onPaste={handleImageUpload}
            onChange={(el) => {
              if (el.target.value.length > 280) {
                return
              }

              setInputValue(el.target.value)
            }}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                onSend()
                inputFileRef.current!.value = ""
              }
            }}
            type="text"
            className="w-full py-2 px-3 outline-none shadow-none rounded-3xl pr-9"
            placeholder="Start a new message"
          />
          <img
            src="/icons/icon-send.png"
            alt=""
            className="absolute bottom-0 right-3 -translate-y-1/2 cursor-pointer"
            onClick={() => {
              onSend()
              inputFileRef.current!.value = ""
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4 mb-1">
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          trigger={["click"]}
          overlayClassName="emoji-dropdown"
          open={openEmoji}
        >
          <Button
            className="w-fit p-0 border-none text-lg hover:bg-transparent"
            onClick={(el) => {
              setOpenEmoji(true)
              el.stopPropagation()
            }}
          >
            😀
          </Button>
        </Dropdown>
        <button
          className="btn-normal"
          onClick={() => {
            inputFileRef.current?.click()
          }}
        >
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={inputFileRef}
            multiple
          />

          <img src="/icons/icon-picture.svg" alt="" className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  )
}

export const MemberItem = ({ data, setGroupCurrent, type }: { data: any; setGroupCurrent: any; type: number }) => {
  const { user_info } = useUser()
  if (type == 2) {
    const isA = user_info?.id !== data?.a_id
    return (
      <div
        className="flex items-center justify-between py-4 cursor-pointer hover:bg-primary-50 px-6"
        onClick={() => {
          setGroupCurrent()
        }}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src={isA ? data?.a_avatar : data?.b_avatar ?? "/dummy/rectangle913.png"}
              className="w-12 h-12 rounded-full object-cover"
              alt=""
            />
          </div>
          <div>
            <div className="text-black text-base font-medium">{isA ? data.a_name : data.b_name}</div>
          </div>
        </div>
        {/* <div className="flex flex-col gap-1 items-end">
          <div className="text-zinc-500 text-xs font-medium">Price</div>
          <div className="text-zinc-950 text-xs font-medium">
           // {currency(isA ? +data?.a_price : +data?.b_price, 6)} ETH
          </div>
        </div> */}
      </div>
    )
  }
  return (
    <div
      className="flex items-center justify-between py-4 cursor-pointer hover:bg-primary-50 px-6"
      onClick={() => {
        setGroupCurrent()
      }}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <img src={data?.avatar ?? "/dummy/rectangle913.png"} className="w-12 h-12 rounded-full object-cover" alt="" />
          {user_info?.full_name == data.full_name && (
            <img src="/icons/medal.png" alt="" className="absolute -bottom-1 bg-black rounded-full p-[1px] right-1" />
          )}
        </div>
        <div>
          <div className="text-black text-base font-medium">{data.full_name}</div>
          <div className="text-sm text-zinc-500 font-medium">
            Members: <span className="text-zinc-950">{data.member}</span>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-1 items-end">
        <div className="text-zinc-500 text-xs font-medium">Price</div>
        <div className="text-zinc-950 text-xs font-medium">{currency(+data?.price, 6)} ETH</div>
      </div> */}
    </div>
  )
}

export const RightChatText = ({
  data,
  isNotShowTime,
  setEditCurrent,
}: {
  data: any
  isNotShowTime?: boolean
  setEditCurrent: (value: any) => void
}) => {

  console.log("check aaaa", data)

  const yesterday = moment().subtract(1, "d")
  const isADayAgo = moment(data.created_time).isBefore(yesterday)
  const [openAction, setOpenAction] = useState(false)
  const handleDelete = async () => {
    const res = await Service.chat.delete({ chat_id: data.id })
  }

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2 cursor-pointer text-zinc-950" onClick={() => setEditCurrent(data)}>
          <img src="/icons/edit.png" alt="" />
          Edit
        </div>
      ),
    },
    // {
    //   key: "1",
    //   label: (
    //     <div className="flex items-center gap-2 cursor-pointer text-red-500" onClick={handleDelete}>
    //       <IconDeleteColor className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
    //       Remove message
    //     </div>
    //   ),
    // },
  ]

  if (data.status == ChatStatus.DELETED) {
    return null
    return (
      <div className="flex gap-2 flex-col items-end mb-2 max-w-[24rem] ">
        <div className="relative rounded-3xl rounded-br-none py-2 px-4 bg-zinc-400/70 w-fit text-black/60 font-medium whitespace-pre-line word-break">
          Message has been deleted
        </div>
      </div>
    )
  }
  return (
    <div
      className="flex gap-2 flex-col items-end mb-2 max-w-[24rem]"
      onMouseEnter={() => setOpenAction(true)}
      onMouseLeave={() => setOpenAction(false)}
    >
      <div className="relative flex flex-col gap-2 items-end">
        {openAction && (
          <div className="absolute bottom-0 -translate-x-full -left-2 w-10 h-10 rounded-full bg-zinc-100 animate__fadeIn animate__animated flex items-center justify-center cursor-pointer">
            <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]} overlayClassName="chat-dropdown">
              <img src="/icons/menu-circle-vertical.png" alt="" />
            </Dropdown>
          </div>
        )}
        {data?.image && (
          <>
            {data?.image?.map((value: any) => (
              <Image key={value} src={value} className="rounded-lg !w-36" alt="" />
            ))}
          </>
        )}
        {data?.content && (
          <div className="rounded-3xl rounded-br-none py-2 px-4 bg-primary-500 w-fit max-w-[18rem] text-black font-medium whitespace-pre-line word-break">
            {data?.content}
          </div>
        )}
      </div>
      <div className="text-zinc-500 text-xs">
        {data.status == ChatStatus.EDITED && (
          <span>
            Edited {!isNotShowTime && <span className="-translate-y-1 inline-block px-1 font-medium"> . </span>}
          </span>
        )}
        {!isNotShowTime && (
          <span>
            {isADayAgo ? moment(data.created_time).format("YYYY/MM/DD , h:mm A") : moment(data.created_time).fromNow()}
          </span>
        )}
      </div>
    </div>
  )
}

export const LeftChatText = ({ data, isNotShowTime }: { data: any; isNotShowTime?: boolean }) => {
  const { user_info } = useUser()
  const router = useRouter()
  const yesterday = moment().subtract(1, "d")
  const isADayAgo = moment(data.created_time).isBefore(yesterday)
  const renderInfoPopup = () => {
    return <CardInfoPopup user={data?.username_twitter} accountId={user_info?.id} />
  }
  if (data.status == ChatStatus.DELETED) {
    return null
  }
  return (
    <div className="flex items-end gap-2 max-w-[24rem] overflow-hidden">
      <Popover content={renderInfoPopup()} placement="bottom" rootClassName="custom-popover">
        <img
          src={data?.avatar}
          alt=""
          className={twMerge("w-7 h-7 rounded-full object-cover mb-5 cursor-pointer", isNotShowTime && "opacity-0")}
          onClick={() => router.push(`/profile/?user=${data?.username_twitter}`)}
        />
      </Popover>
      <div className="flex gap-2 flex-col mb-2">
        <div className="relative flex flex-col gap-2 items-start">
          {data?.image && (
            <div className="flex justify-end">
              {data?.image?.map((value: any) => (
                <Image key={value} src={value} className="rounded-lg !w-36" alt="" />
              ))}
            </div>
          )}
          {data?.content && (
            <div className="rounded-3xl rounded-bl-none py-2 px-4 bg-zinc-100 w-fit text-black font-medium max-w-full whitespace-pre-line word-break">
              {data?.content}
            </div>
          )}
        </div>
        <div className="text-zinc-500 text-xs">
          {data.status == ChatStatus.EDITED && (
            <span>
              Edited {!isNotShowTime && <span className="-translate-y-1 inline-block px-1 font-medium"> . </span>}
            </span>
          )}
          {!isNotShowTime && (
            <span>
              {isADayAgo
                ? moment(data.created_time).format("YYYY/MM/DD , h:mm A")
                : moment(data.created_time).fromNow()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
