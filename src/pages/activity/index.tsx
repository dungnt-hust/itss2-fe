import ProfileCard from "@/components/activity/profile-card"
import { Select } from "antd"
import { useEffect, useState } from "react"
import useGetListLike from "@/hooks/user/use-get-list-like";
import { Avatar } from "antd"
import { Service } from "@/services/app.service";
import { useRouter } from "next/router";

const ActivityPage = () => {
  const { listLike, mutateListLike, setParams, params } = useGetListLike();

  const [filterSelect, setfilterSelect] = useState(true);
  const router = useRouter();

  const filterOptions = [
    {
      label: "Mới nhất",
      value: true,
    },
    {
      label: "Cũ nhất",
      value: false,
    },
  ]

  const handleDate = (dateRaw: any) => {
    const locale = 'en';
    const dateConvert = new Date(dateRaw);
    const date = `${dateConvert.getDate()}/${dateConvert.getMonth()}/${dateConvert.getFullYear()}`;
    const time = dateConvert.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });
    return { time, date }
  }

  const handleLike = async (user_id: any) => {
    const res = await Service.user.like({ user_id });
  }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full gradient-bg2 p-4">
        <div className="w-[20%] flex items-center justify-between">
          <a
            onClick={() => setParams({ reverse: true, type: 1 })}
            className={`${params.reverse === true ? "text-[#56F35C]" : "text-white"} text-xl font-normal cursor-pointer`}
          >
            Thích tôi
          </a>
          <a
            onClick={() => setParams({ reverse: false, type: 2 })}
            className={`${params.reverse === false ? "text-[#56F35C]" : "text-white"} text-xl font-normal cursor-pointer`}
          >
            Tôi thích
          </a>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 px-32 py-2">
        <h1 className="text-lg text-black font-normal">Lọc :</h1>
        <Select
          style={{ width: 150 }}
          options={filterOptions}
          value={params.reverse}
          defaultValue={true}
          onChange={(e) => {
            //setfilterSelect(e)
            setParams({ reverse: e, type: params.type })
          }}
        />
      </div>

      <div className="w-full flex flex-col gap-8">
        {listLike?.data.map((value: any, index: any) => (
          <div className="w-full border border-black rounded p-6 flex items-start justify-between bg-white ">
            <div className="flex w-fit items-center gap-4">
              <Avatar onClick={()=>router.push(`/activity/${value.id}`)} size={64} src={value.avatar} alt="" className="border border-black rounded-full cursor-pointer" />

              <div className="flex flex-col gap-2">
                <h1 className="flex items-center gap-2 text-base text-black font-normal">
                  {value.fullname}
                  <Avatar size={15} className="bg-[#BEC1BF]" />
                </h1>
                <h1 className="text-base text-black font-normal">Tuổi: {value.age}</h1>
                <h1 className="text-base text-black font-normal">{value.city_name || "Ha noi"} </h1>
                <h1 className="text-base text-black font-normal">{value.description || "default"} </h1>

                <div className="flex items-center gap-6 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="cursor-pointer"
                    onClick={() => handleLike(value.id)}
                  >
                    <path
                      d="M4.27598 13.8336L11.1306 20.4158C11.3768 20.6523 11.5 20.7706 11.6463 20.7982C11.7075 20.8097 11.7703 20.8097 11.8315 20.7982C11.9778 20.7706 12.101 20.6523 12.3472 20.4158L19.2018 13.8336C21.0819 12.0282 21.3113 9.10082 19.7355 7.02461L19.3752 6.54989C17.4617 4.02886 13.5541 4.44545 12.2152 7.31321C12.0264 7.71757 11.4514 7.71757 11.2626 7.31321C9.92365 4.44545 6.01609 4.02886 4.10264 6.54989L3.74233 7.02461C2.1665 9.10082 2.39593 12.0282 4.27598 13.8336Z"
                      fill={value.is_like == 1 || params.type == 2 ? "#FF0000": "#222222"}
                      stroke={value.is_like == 1 || params.type == 2 ? "#FF0000": "#222222"}
                      strokeWidth="2"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.99979 10.4C2.99979 8.15979 2.99979 7.03969 3.43576 6.18404C3.81926 5.43139 4.43118 4.81947 5.18383 4.43597C6.03947 4 7.15958 4 9.39979 4H14.5998C16.84 4 17.9601 4 18.8158 4.43597C19.5684 4.81947 20.1803 5.43139 20.5638 6.18404C20.9998 7.03969 20.9998 8.15979 20.9998 10.4V11.6C20.9998 13.8402 20.9998 14.9603 20.5638 15.816C20.1803 16.5686 19.5684 17.1805 18.8158 17.564C17.9601 18 16.84 18 14.5998 18H7.26828C6.99925 18 6.74157 18.1084 6.55345 18.3007L4.6494 20.2471C4.02269 20.8877 2.93457 20.444 2.93457 19.5478V18V13.0326C2.93457 13.0146 2.94917 13 2.96718 13C2.98519 13 2.99979 12.9854 2.99979 12.9674V10.4ZM8.80414 8C8.25185 8 7.80414 8.44772 7.80414 9C7.80414 9.55228 8.25185 10 8.80414 10H14.6737C15.226 10 15.6737 9.55228 15.6737 9C15.6737 8.44772 15.226 8 14.6737 8H8.80414ZM8.80414 12C8.25185 12 7.80414 12.4477 7.80414 13C7.80414 13.5523 8.25185 14 8.80414 14H11.7389C12.2912 14 12.7389 13.5523 12.7389 13C12.7389 12.4477 12.2912 12 11.7389 12H8.80414Z"
                      fill="#222222"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h1 className="text-xl text-black font-normal">{handleDate(value.created_time).time} {handleDate(value.created_time).date}  </h1>
          </div>
        ))}

        {/* <ProfileCard profile = {}/> */}
      </div>
    </div>
  )
}

export default ActivityPage
