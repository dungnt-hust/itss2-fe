import { routers, routerNotLogins } from "@/constants/app"
import { useUser } from "@/hooks/stores/useUser"
import useGetUserInfo from "@/hooks/user/use-get-userInfo"
import { Dropdown, Menu } from "antd"
import { useToken } from "antd/es/theme/internal"
import Link from "next/link"
import { useRouter } from "next/router"
import { twMerge } from "tailwind-merge"

const LayoutApp = ({ children }: any) => {
  const router = useRouter();
  const { userInfo: info } = useGetUserInfo()
  const { reset } = useUser()

  const handleLogout = () => {
    localStorage.clear()
    reset()
    router.push(`/auth/login`)
  }
  const menu = (
    <Menu className="font-bold">
      <Menu.Item>
        <div onClick={() => router.push(`/activity/${info.id}`)} className="flex items-center w-full">
          <div className="relative w-12 h-10">
            <svg className=" absolute" xmlns="http://www.w3.org/2000/svg" width="37" height="35" viewBox="0 0 37 35" fill="none">
              <path d="M35.5619 14.3868L19.8693 0.928063C19.6801 0.767978 19.455 0.640916 19.207 0.554205C18.959 0.467495 18.6929 0.422852 18.4242 0.422852C18.1556 0.422852 17.8895 0.467495 17.6415 0.554205C17.3935 0.640916 17.1684 0.767978 16.9791 0.928063L1.28657 14.4038C0.906853 14.7251 0.606959 15.1064 0.404306 15.5257C0.201653 15.9449 0.100279 16.3938 0.10607 16.8462V31.1589C0.104493 32.0332 0.502502 32.8748 1.21813 33.5103C1.93377 34.1457 2.91254 34.5267 3.95289 34.5748H32.8956C33.936 34.5267 34.9147 34.1457 35.6304 33.5103C36.346 32.8748 36.744 32.0332 36.7424 31.1589V16.8462C36.744 15.9289 36.3207 15.047 35.5619 14.3868ZM14.3535 31.1589V20.9112H22.4949V31.1589H14.3535ZM32.6717 31.1589H26.5657V19.2032C26.5657 18.7502 26.3512 18.3158 25.9695 17.9955C25.5878 17.6752 25.0701 17.4953 24.5303 17.4953H12.3182C11.7784 17.4953 11.2607 17.6752 10.879 17.9955C10.4973 18.3158 10.2828 18.7502 10.2828 19.2032V31.1589H4.17678V16.7779L18.4242 4.56601L32.6717 16.8462V31.1589Z" fill="#231F20" />
            </svg>
          </div>

          <div className="font-bold">XEM HỒ SƠ</div>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => router.push(`/edit/${info.id}`)} className="flex items-center">
          <div className="relative w-12 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none" className=" absolute">
              <path d="M28.5715 1.78613H5.3572C3.38475 1.78613 1.78577 3.38511 1.78577 5.35756V44.6433C1.78577 46.6158 3.38475 48.2147 5.3572 48.2147H37.5001C39.4726 48.2147 41.0715 46.6158 41.0715 44.6433V28.5718" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M1.78577 37.5H41.0715" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.5 10.7148H19.6429" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.5 19.6436H16.0714" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M32.122 26.8068L21.4077 28.7354L23.1934 17.8783L38.3004 2.84255C38.6326 2.50781 39.0276 2.24212 39.4629 2.0608C39.8979 1.87948 40.3647 1.78613 40.8361 1.78613C41.3079 1.78613 41.7747 1.87948 42.2097 2.0608C42.6451 2.24212 43.0401 2.50781 43.3719 2.84255L47.1576 6.62828C47.4926 6.96028 47.7583 7.35528 47.9394 7.79049C48.1208 8.22571 48.214 8.69253 48.214 9.16399C48.214 9.63546 48.1208 10.1023 47.9394 10.5375C47.7583 10.9727 47.4926 11.3677 47.1576 11.6997L32.122 26.8068Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <div className="font-bold">CHỈNH SỬA HỒ SƠ</div>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => router.push(`/activity/${info.id}`)} className="flex items-center">
          <div className="relative w-12 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="37" viewBox="0 0 46 37" fill="none">
              <path d="M22.9864 0C16.6651 0 11.4932 5.04595 11.4932 11.2633C11.4932 17.4806 16.6651 22.5266 22.9864 22.5266C29.3076 22.5266 34.4795 17.4806 34.4795 11.2633C34.4795 5.04595 29.3076 0 22.9864 0ZM10.976 22.5266C4.8846 22.7518 0 26.6715 0 31.5372V36.0425H45.9727V31.5372C45.9727 26.6715 41.1456 22.7518 34.9967 22.5266C31.8936 25.2748 27.6411 27.0319 22.9864 27.0319C18.3316 27.0319 14.0791 25.2748 10.976 22.5266Z" fill="black" />
            </svg>
          </div>

          <span className="font-bold">XÓA TÀI KHOẢN</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => handleLogout()} className="flex items-center ">
          <div className="relative w-12 h-10">
            <img src="/images/logout_icon.png" width="46" height="37" alt="" />
          </div>
          <div className="font-bold">ĐĂNG XUẤT</div>

        </div>
      </Menu.Item>
    </Menu>
  );

  const _renderHeader = () => {
    return (
      info ?
        <div className="h-16 px-6 flex justify-between items-center bg-white">
          <img src="/logo/logo.png" className="h-12" alt="" />
          <div className="flex items-center gap-20">
            {routers.map((value) => (
              <Link href={value.link} key={value.title}>
                <div
                  className={twMerge("text-xl text-black", router.pathname == value.link && "text-red-500")}
                >
                  {value.title}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 relative">
            <div className="flex items-center gap-2">
              <div className="text-2xl">{info?.email} </div>
              <img src="/images/avatar.png" alt="" />
            </div>
            <Dropdown overlay={menu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="59" viewBox="0 0 60 59" fill="none">
                <path d="M12.5 17.5H47.5" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                <path d="M12.5 30H47.5" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                <path d="M12.5 42.5H47.5" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Dropdown>
          </div>
        </div> :

        <div className="h-16 px-6 flex justify-between items-center bg-white">
          <img src="/logo/logo.png" className="h-12" alt="" />
          <div className="flex items-center text-center gap-20 ">
            {routerNotLogins.map((value) => (
              <Link href={value.link} key={value.title}>
                <div
                  className={twMerge("text-lg text-black border border-[rgba(255,3,3,1)] bg-[rgba(255,239,239,1)]  rounded-lg w-32", router.pathname == value.link && "text-black bg-[rgba(251,28,28,1)]")}
                >
                  {value.title}
                </div>
              </Link>
            ))}
          </div>

        </div>

    )
  }

  const _renderPage = () => {
    return <div className="flex-1">{children}</div>
  }

  const _footerPage = () => {
    return (
      <div className="h-16 justify-between flex items-center bg-white px-6 text-black text-xl">
        <div>Bản quyền thuộc về nhóm De-to</div>
        <div>Liên hệ : deto123@gmail.com | 0123456789 </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen bg-[url(/images/bofy.png)] bg-no-repeat bg-cover bg-center`}>
      {_renderHeader()}
      {_renderPage()}
      {_footerPage()}
    </div>
  )
}
export default LayoutApp
