import { provinces } from "@/constants/app"
import { useUser } from "@/hooks/stores/useUser"
import useGetUserInfo from "@/hooks/user/use-get-userInfo"
import { Service } from "@/services/app.service"
import { Divider, Select } from "antd"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"

const ProfilePage = () => {
  const router = useRouter()
  const {
    query: { id },
  } = router

  const [currentUser, setCurrentUser] = useState<{
    fullname: string
    gender: 1 | 2
    age: number
    city: number
    description: string
    academy_level: string
    hobby: string
    height: number
    weight: number
    job: string
    language: string
    marital_status: number
    description_info: string
    description_desire: string
  }>()

  const { userInfo, refreshUserInfo } = useGetUserInfo()


  // const { data: userInfo } = useSWR(["getUserInfo", id], async () => {
  //   if (!id) {
  //     return
  //   }
  //   const res = await Service.user.getUserInfo({ user_id: id })
  //   return res?.data
  // })


  useEffect(() => {

    if (!userInfo) return

    const { fullname, gender, age, city,
      description, academy_level, hobby, height,
      weight, job, language, marital_status, description_info,
      description_desire } = userInfo

    setCurrentUser({
      fullname, gender, age, city,
      description, academy_level, hobby, height,
      weight, job, language, marital_status, description_info,
      description_desire
    })

  }, [userInfo])

  const handleChangeInfo = (item: any) => {
    const { field, value } = item
    setCurrentUser(prev => ({
      ...prev,
      [field]: value
    } as any))
  }

  const onFinish = async (e: any) => {
    e.preventDefault()
    const res = await Service.user.edit(currentUser)
    if (res.data) {
      refreshUserInfo()
    }
  }

  if (userInfo && id && +userInfo.id !== +id) {
    return <div>Not Permission</div>
  }

  return (
    <div className="w-full bg-[#A1FF91]">
      <h1 className="text-xl font-normal text-black py-2 px-6">Chỉnh sửa hồ sơ</h1>
      <div className="py-[80px] px-[50px] gradient-bg1 flex flex-col gap-[63px] ">
        <div className="flex items-start gap-[29px] max-xl:flex-col">
          <div className="w-2/5 max-xl:mx-auto">
            <img
              src={userInfo?.avatar ? userInfo?.avatar : "/images/activity/profile-img.png"}
              className="w-fit max-w-lg max-h-[600px]"
              alt=""
            />
          </div>

          <div className="flex flex-col gap-[54px] w-full">
            <div className="flex items-start gap-52">
              <div className="flex flex-col gap-[17px]">
                <div className="flex items-center justify-start cursor-pointer">
                  <div className="">Tên:</div>
                  <input
                    className="right-0"
                    type="text"
                    value={currentUser?.fullname}
                    onChange={(e) => {
                      e.preventDefault, handleChangeInfo({ field: "fullname", value: e.target.value })
                    }}
                  />
                </div>

                <div className="relative flex items-center justify-start cursor-pointer">
                  <div>Giới tính: </div>
                  <div className=" absolute right-0">
                    <Select
                      value={currentUser?.gender?.toString()}
                      style={{ width: 100 }}
                      options={[
                        { value: "1", label: "Nam" },
                        { value: "2", label: "Nữ" },
                      ]}
                      onChange={(e) => handleChangeInfo({ field: "gender", value: e })}
                    />
                  </div>
                </div>
                <div className="relative flex items-center gap-1 text-[20px] font-serif ">
                  <div>Tuổi:</div>
                  <Select
                    className="border border-solid border-black rounded-lg bg-[#D9D9D9] w-[80px] font-serif absolute right-0"
                    style={{ width: 100 }}
                    value={currentUser?.age}
                    options={Array.from({ length: 83 }, (_, i) => i + 18).map((value) => ({
                      value: value.toString(),
                      label: value.toString(),
                    }))}
                    onChange={(e) => handleChangeInfo({ field: "age", value: e })}
                  />
                </div>
                <div className="relative flex items-center gap-1 text-[20px] font-serif ">
                  <div>Địa chỉ:</div>
                  <Select
                    className="border border-solid border-black rounded-lg bg-[#D9D9D9] w-[120px] font-serif absolute right-0"
                    value={Number(currentUser?.city)}
                    style={{ width: 100 }}
                    options={provinces.map((province, index) => ({ value: index + 1, label: province }))}
                    onChange={(e) => handleChangeInfo({ field: "city", value: e })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[17px]">
                <div className="pl-6 flex items-center gap-28 mb-10">
                  <div className="flex flex-col">
                    <div>Tôi tìm</div>
                    <Select
                      style={{ width: 100 }}
                      options={[
                        { value: "1", label: "Nam" },
                        { value: "2", label: "Nữ" },
                      ]}
                    // onChange={(e) => handleChangeInfo(e, { gender_find: e })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div>Tuổi</div>
                    <div>
                      <Select
                        defaultValue="15"
                        style={{ width: 70 }}
                        options={Array.from({ length: 83 }, (_, i) => i + 18).map((value) => ({
                          value: value.toString(),
                          label: value.toString(),
                        }))}
                      //onChange={(e) => handleChangeInfo(e, { age_start: e })}
                      />
                      <Select
                        defaultValue="20"
                        style={{ width: 70 }}
                        options={Array.from({ length: 83 }, (_, i) => i + 18).map((value) => ({
                          value: value.toString(),
                          label: value.toString(),
                        }))}
                      // onChange={(e) => handleChangeInfo(e, { age_end: e })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <table className="border-collapse">
              <thead className="">
                <tr className="grid grid-cols-3 border border-b-0 border-black border-b-none">
                  <th className="text-left bg-[#B9B9B9]"></th>
                  <th className="text-left bg-[#B9B9B9] border-l border-black p-2">{currentUser?.fullname}</th>
                  <th className="text-left bg-[#B9B9B9] border-l border-black p-2">Đang tìm</th>
                </tr>
              </thead>
              <tbody>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Trình độ văn hóa</td>
                  <td className="text-left px-2 py-1 border-l border-black">
                    <input
                      type="text"
                      value={currentUser?.academy_level}
                      onChange={(e) => {
                        e.preventDefault, handleChangeInfo({ field: "academy_level", value: e.target.value })
                      }}
                    />
                  </td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Sở thích</td>
                  <td className="text-left px-2 py-1 border-l border-black">
                    <input
                      type="text"
                      value={currentUser?.hobby}
                      onChange={(e) => {
                        e.preventDefault, handleChangeInfo({ field: "hobby", value: e.target.value })
                      }}
                    />
                  </td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>

                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Cân nặng</td>
                  <td className="text-left px-2 py-1 border-l border-black">
                    <input
                      type="text"
                      value={currentUser?.weight}
                      onChange={(e) => {
                        e.preventDefault, handleChangeInfo({ field: "weight", value: e.target.value })
                      }}
                    />
                  </td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Chiều cao</td>
                  <td className="text-left px-2 py-1 border-l border-black">
                    <input
                      type="text"
                      value={currentUser?.height}
                      onChange={(e) => {
                        e.preventDefault, handleChangeInfo({ field: "height", value: e.target.value })
                      }}
                    />
                  </td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Nghề nghiệp</td>
                  <td className="text-left px-2 py-1 border-l border-black">
                    <input
                      type="text"
                      value={currentUser?.job}
                      onChange={(e) => {
                        e.preventDefault, handleChangeInfo({ field: "job", value: e.target.value })
                      }}
                    />
                  </td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Ngôn ngữ</td>
                  <td className="text-left px-2 py-1 border-l border-black">
                    <input
                      type="text"
                      value={currentUser?.language}
                      onChange={(e) => {
                        e.preventDefault, handleChangeInfo({ field: "language", value: e.target.value })
                      }}
                    />
                  </td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-black">
                  <td className="text-left px-2 py-1">Tình trạng hôn nhân</td>
                  <td className="text-left px-2 py-1 border-l border-black">
                    <Select
                      className="flex  border-solid border-black rounded-lg bg-[#D9D9D9] w-[80px] font-serif ml-8"
                      value={currentUser?.marital_status?.toString()}
                      style={{ width: 150, margin: 0 }}
                      options={[
                        { value: "1", label: "Độc thân" },
                        { value: "2", label: "Đã kết hôn" },
                      ]}
                      onChange={(e) => handleChangeInfo({ field: "marital_status", value: e })}
                    />
                  </td>
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
                <input
                  className="w-full"
                  type="text"
                  value={currentUser?.description_info}
                  onChange={(e) => {
                    e.preventDefault, handleChangeInfo({ field: "description_info", value: e.target.value })
                  }}
                />
                {/* <h1 className="text-black text-xl font-normal">
                  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                </h1> */}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-black text-xl font-normal">Điều tôi mong muốn ở nửa kia</h1>
              <div className="w-full bg-white p-2">
                <input
                  className="w-full"
                  type="text"
                  value={currentUser?.description_desire}
                  onChange={(e) => {
                    e.preventDefault, handleChangeInfo({ field: "description_desire", value: e.target.value })
                  }}
                />
                {/* <h1 className="text-black text-xl font-normal">
                  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                </h1> */}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" text-center text-[24px] mx-auto mt-4">
            <button
              onClick={(e) => onFinish(e)}
              className="w-[162px] h-12 text-black bg-white border border-black rounded-3xl text-[20px] active:bg-green-600 cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
