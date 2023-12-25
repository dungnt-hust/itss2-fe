import { Img } from "@/components/img"
import { IconVerifed } from "@/components/svg"
// import { BLUE_CHECK } from "@/constants/app"
import { useUserInfoSearch } from "@/hooks/core/useUserInfoSearch"
import { Service } from "@/services/app.service"
import { Avatar, Button, message } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
import { memo } from "react"

interface IProps {
  user: string
  accountId: number | undefined
  handleCallBackUnFollow?: () => void
  handleCallBackFollow?: () => void
}

/* eslint-disable @next/next/no-img-element */
export const CardInfoPopup = memo(({ user, accountId, handleCallBackUnFollow, handleCallBackFollow }: IProps) => {
  const router = useRouter()

  const { userInfoSearch, reloadInfoSearch } = useUserInfoSearch(user || "")

//   const _handleUnFollow = async () => {
//     if (!userInfoSearch?.id) {
//       return
//     }

//     const res = await Service.follow.create(userInfoSearch?.id)
//     if (res) {
//       message.success(`You unfollowed @${userInfoSearch?.username_twitter}`)
//       handleCallBackUnFollow && handleCallBackUnFollow()
//       reloadInfoSearch()
//     }
//   }

//   const _handleFollow = async () => {
//     if (!userInfoSearch?.id) {
//       return
//     }

//     const res = await Service.follow.create(userInfoSearch?.id)
//     if (res) {
//       message.success(`You followed @${userInfoSearch?.username_twitter}`)
//       handleCallBackFollow && handleCallBackFollow()
//       reloadInfoSearch()
//     }
//   }

  return (
    <div className="rounded-2xl overflow-hidden w-[18rem]" onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <Img src={userInfoSearch?.banner} className="w-full h-24 object-cover" alt="" />

        <Link href={`/profile?user=${userInfoSearch?.username_twitter}`}>
          <Avatar src={userInfoSearch?.avatar} className="w-12 h-12 bottom-[1rem] left-[0.5rem] absolute" />
        </Link>

        <div className="flex items-center gap-2 justify-end mt-1 px-4">
          <Button
            type="primary"
            onClick={() => {
              router.push({
                pathname: "/buy-sell",
                query: {
                  user: userInfoSearch?.username_twitter,
                },
              })
            }}
          >
            Buy
          </Button>

          {/* {userInfoSearch?.id !== accountId &&
            (userInfoSearch?.is_follow === 1 ? (
              <div className="btn-normal" onClick={_handleUnFollow}>
                <img src="/icons/icon-user-remove.svg" alt="" className="w-4 h-4 md:w-6 md:h-6" />
              </div>
            ) : (
              <div className="btn-normal" onClick={_handleFollow}>
                <img src="/icons/icon-user-add.svg" alt="" className="w-4 h-4 md:w-6 md:h-6" />
              </div>
            ))} */}
        </div>
      </div>

      <div className="p-4 pt-1">
        <div className="flex items-center gap-1 flex-wrap">
          <Link href={`/profile?user=${userInfoSearch?.username_twitter}`}>
            <span className="text-sm font-medium text-zinc-950 hover:underline cursor-pointer">
              {userInfoSearch?.full_name}
            </span>
          </Link>
          {/* {userInfoSearch?.blue_check === BLUE_CHECK.VERIFIED && <IconVerifed />} */}
        </div>
        <p className="text-xs text-zinc-500">@{userInfoSearch?.username_twitter}</p>

        {userInfoSearch?.description && (
          <div className="text-xs text-zinc-500 mt-1 line-clamp-2">{userInfoSearch?.description}</div>
        )}

        <div className="flex items-center gap-6 mt-2">
          <div className="text-sm text-zinc-500 flex-1">
            {userInfoSearch?.holder || 0} <span className="font-medium text-zinc-950">Holders</span>
          </div>
          <div className="text-sm flex-[2]">
            {userInfoSearch?.holding || 0} <span className="font-medium text-zinc-950">Holding</span>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-0.5">
          <div className="text-sm text-zinc-500 flex-1">
            {userInfoSearch?.following || 0} <span className="font-medium text-zinc-950">Following</span>
          </div>
          <div className="text-sm flex-[2]">
            {userInfoSearch?.follower || 0} <span className="font-medium text-zinc-950">Followers</span>
          </div>
        </div>
      </div>
    </div>
  )
})

CardInfoPopup.displayName = "CardInfoPopup"
