import { Avatar, Button, Divider } from "antd"

const ProfilePage = () => {
  return (
    <div className="w-full bg-[#A1FF91]">
      <h1 className="text-xl font-normal text-black py-2 px-6">Hồ sơ của tôi</h1>
      <div className="py-[80px] px-[50px] gradient-bg1 flex flex-col gap-[63px]">
        <div className="flex items-start gap-[29px]">
          <img src="/images/activity/profile-img.png" className="w-fit" alt="" />
          <div className="flex flex-col gap-[54px] w-full">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-[17px]">
                <h1 className="flex items-center gap-4 text-2xl text-white font-normal">
                  Trần Tuấn Anh <Avatar className="bg-[#08F13B]" size={20} />
                </h1>

                <h1 className="text-2xl text-white font-normal">Nam - 25</h1>
                <h1 className="text-2xl text-white font-normal">Hà Nội </h1>
                <h1 className="text-2xl text-white font-normal">Tìm: Nữ 23 - 35</h1>
              </div>

              <Button
                size="large"
                className="bg-[#fff6d5] border border-solid border-black !text-2xl !h-fit text-black font-normal"
              >
                Chỉnh sửa
              </Button>
            </div>

            <table className="border-collapse">
              <thead className="">
                <tr className="grid grid-cols-3 border border-b-0 border-black border-b-none">
                  <th className="text-left bg-[#B9B9B9]"></th>
                  <th className="text-left bg-[#B9B9B9] border-l border-black p-2">Trần Tuấn Anh</th>
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
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Chiều cao</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Nghề nghiệp</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-b-0 border-black">
                  <td className="text-left px-2 py-1">Ngôn ngữ</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
                </tr>
                <tr className="grid grid-cols-3 border border-black">
                  <td className="text-left px-2 py-1">Tình trạng hôn nhân</td>
                  <td className="text-left px-2 py-1 border-l border-black">-----------------------</td>
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
