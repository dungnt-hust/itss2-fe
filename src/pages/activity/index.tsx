import ProfileCard from "@/components/activity/profile-card"
import { Select } from "antd"
import { useState } from "react"

const ActivityPage = () => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1)
  const [activeFilter, setActiveFilter] = useState<1 | 2>(1)
  const filterOptions = [
    {
      label: "Mới nhất",
      value: 1,
    },
    {
      label: "Cũ nhất",
      value: 2,
    },
  ]
  return (
    <div className="w-full min-h-screen">
      <div className="w-full gradient-bg2 p-4">
        <div className="w-[20%] flex items-center justify-between">
          <a
            onClick={() => setActiveTab(1)}
            className={`${activeTab === 1 ? "text-[#56F35C]" : "text-white"} text-xl font-normal cursor-pointer`}
          >
            Thích tôi
          </a>
          <a
            onClick={() => setActiveTab(2)}
            className={`${activeTab === 2 ? "text-[#56F35C]" : "text-white"} text-xl font-normal cursor-pointer`}
          >
            Tôi thích
          </a>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 px-32 py-2">
        <h1 className="text-lg text-black font-normal">Lọc :</h1>
        <Select value={activeFilter} onChange={(e) => setActiveFilter(e)} options={filterOptions} />
      </div>

      <div className="w-full flex flex-col gap-8">
        <ProfileCard />
      </div>
    </div>
  )
}

export default ActivityPage
