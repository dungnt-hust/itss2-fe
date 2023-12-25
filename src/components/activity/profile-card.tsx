import { Avatar } from "antd"
import { FC } from "react"

interface IProps {
  profile: {}
}

const ProfileCard: FC<IProps> = () => {
  return (
    <div className="w-full border border-black rounded p-6 flex items-start justify-between bg-white">
      <div className="flex w-fit items-center gap-4">
        <Avatar size={64} src="/images/avatar.png" alt="" className="border border-black rounded-full" />

        <div className="flex flex-col gap-2">
          <h1 className="flex items-center gap-2 text-base text-black font-normal">
            Trịnh Mai Anh
            <Avatar size={15} className="bg-[#BEC1BF]" />
          </h1>
          <h1 className="text-base text-black font-normal">Tuổi: 25</h1>
          <h1 className="text-base text-black font-normal">Thanh Oai , Hà Nội </h1>
          <h1 className="text-base text-black font-normal">Tìm: Nam 23 - 35 </h1>

          <div className="flex items-center gap-4">
            <img src="/icons/heart-black.png" alt="" />
            <img src="/icons/comment-black.png" alt="" />
          </div>
        </div>
      </div>

      <h1 className="text-xl text-black font-normal">11 /5 /2023 10:20 AM </h1>
    </div>
  )
}

export default ProfileCard
