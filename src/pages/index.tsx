const HomePage = () => {
  return (
    <div className="homepage-background flex-1 bg-[linear-gradient(90.18deg, #353434 16.7%, rgba(255, 66, 66, 0.739583) 54.6%, rgba(255, 105, 108, 0) 99.88%)] w-full h-screen">
      <div className="w-full h-[90%] flex justify-center items-center  gap">
        <div className="w-[37%] items-center text-center text-white text-[32px] font-sans font-bold pl-44">
          <div className="mx-auto">
            GẶP GỠ NGƯỜI ĐỘC THÂN NGAY
            <div className="underline">TẠI ĐÂY !
            </div>
          </div>
          <div className="text-[20px] mt-6">Trang Web hẹn hò hàng đầu Việt Nam </div>
        </div>
        <div className=" mx-auto my-auto">
          <div className="mx-auto">
            <img src="/images/home_image.png" alt=""/>
          </div>
          <div className="w-[80%] mx-auto mt-7">
            <img src="/images/home_chat.png" alt=""/>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-center w-full h-[10%] text-white text-[14px]">
        <div className="flex w-1/3 justify-center items-center text-center">
          <div className="h-5 w-5 border-none rounded-full bg-white"></div>
          <div> Xem lại miễn phí những người xứng đôi với bạn</div>
        </div>
        <div className="flex w-1/3 justify-center items-center text-center">
          <div className="h-5 w-5 border-none rounded-full bg-white"></div>
          <div> Trực tiếp trò chuyện online bằng tính năng cao cấp</div>
        </div>
        <div className="flex w-1/3 justify-center items-center text-center">
          <div className="h-5 w-5 border-none rounded-full bg-white"></div>
          <div> An toàn, đáng tin cậy</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
