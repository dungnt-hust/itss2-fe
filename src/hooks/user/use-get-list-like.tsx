import { Service } from "@/services/app.service"
import useSWR from "swr"
import { useState } from "react"

const useGetListLike = () => {
  // const {token} = useUser()
  const [params, setParams] = useState<{ reverse: boolean, type: number}>({reverse: true, type: 1});


  // const {token} = useUser()

  const { data: listLike, mutate: mutateListLike } = useSWR(["getListLike", params], async () => {
    const res = await Service.user.getListLike(params)
    return res?.data
  })
  return {
    listLike,
    mutateListLike,
    setParams, params
  }
}

export default useGetListLike
