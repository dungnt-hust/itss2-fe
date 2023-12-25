import { Service } from "@/services/app.service";
import { Avatar, Button, Divider } from "antd"
import { useRouter } from "next/router"
import { useState } from "react";
import useSWR from "swr"

const ProfilePage = () => {
  const router = useRouter()
  const {
    query: { id },
  } = router;
  console.log(id);
  const { data: userInfo } = useSWR(["getUserInfo", id], async () => {
    if (!id) {
      return
    }
    const res = await Service.user.getUserInfo({ user_id: id })
    return res?.data
  })

  const infoRaw = localStorage.getItem('user_info');
  const info = infoRaw ? JSON.parse(infoRaw) : null;
  // if(info && id && +info.id === +id)

  return (
    <div className="w-full bg-[#A1FF91]">
      <h1 className="text-xl font-normal text-black py-2 px-6">Hồ sơ của tôi</h1>
      <div className="py-[80px] px-[50px] gradient-bg1 flex flex-col gap-[63px]">
        <div className="flex items-start gap-[29px]">
          <img src={userInfo?.avatar} className="w-fit max-w-lg max-h-[600px]" alt="" />
          <div className="flex flex-col gap-[54px] w-full">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-[17px]">
                <h1 className="flex items-center gap-4 text-2xl text-white font-normal">
                  {userInfo?.fullname} <Avatar className="bg-[#08F13B]" size={20} />
                </h1>

                <h1 className="text-2xl text-white font-normal">{userInfo?.gender == 1 ? "Nam" : "Nữ"} - {userInfo?.age}</h1>
                <h1 className="text-2xl text-white font-normal">{userInfo?.city} </h1>
                <h1 className="text-2xl text-white font-normal">{userInfo?.description}</h1>
              </div>

              {info && id && +info.id === +id ? (
                <Button 
                  onClick={()=> router.push(`/edit/${info?.id}`)}
                  size="large"
                  className="bg-[#fff6d5] border border-solid border-black !text-2xl !h-fit text-black font-normal"
                >
                  Chỉnh sửa
                </Button>
              ) : null}
            </div>

            <table className="border-collapse">
              <thead className="">
                <tr className="grid grid-cols-3 border border-b-0 border-black border-b-none">
                  <th className="text-left bg-[#B9B9B9]"></th>
                  <th className="text-left bg-[#B9B9B9] border-l border-black p-2">{userInfo?.fullname}</th>
                  <th className="text-left bg-[#B9B9B9] border-l border-black p-2">Đang tìm</th>
                </tr>
              </thead>
              <tbody>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Trình độ văn hóa</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Sở thích</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>

                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Cân nặng</td>
                  <td className="text-left px-2 py-1 border-l border-black">{userInfo?.weight ? `${userInfo?.weight} kg` : '-----------------------'}</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Chiều cao</td>
                  <td className="text-left px-2 py-1 border-l border-black">{userInfo?.height ? `${userInfo?.height} cm` : '-----------------------'}</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Nghề nghiệp</td>
                  <td className="text-left px-2 py-1 border-l border-black">{userInfo?.job ? `${userInfo?.job}` : '-----------------------'}</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Ngôn ngữ</td>
                  <td className="text-left px-2 py-1 border-l border-black">{userInfo?.job ? `${userInfo?.job}` : '-----------------------'}</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-black">
                  <td className="text-left px-2 py-1">Tình trạng hôn nhân</td>
                  <td className="text-left px-2 py-1 border-l border-black">{userInfo?.marital_status ? `Độc thân` : 'Đã Kết hôn'}</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-2xl text-black font-bold">Giới thiệu về bản thân tôi</h1>
          <Divider className="border-[#989595]" />

          <div className="mt-5 flex flex-col gap-[22px]">
            <div className="flex flex-col gap-4">
              <h1 className="text-black text-xl font-normal">Vài nét về bản thân tôi</h1>
              <div className="w-full bg-white p-2">
                <h1 className="text-black text-xl font-normal">
                  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-black text-xl font-normal">Điều tôi mong muốn ở nửa kia</h1>
              <div className="w-full bg-white p-2">
                <h1 className="text-black text-xl font-normal">
                  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage


