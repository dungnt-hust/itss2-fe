import { ImagesPreview } from "@/@interfaces/file";
import { InputChat } from "@/components/chat/chatComponents";
import { Service } from "@/services/app.service";
import { useState } from "react";
import { useDebounce } from "use-debounce"
const data = [
    { name: 'Nguyen Van A', image: '/images/girl.png' },
    { name: 'Nguyen Van B', image: '/images/girl.png' },
    { name: 'Nguyen Van C', image: '/images/girl.png' },
    { name: 'Nguyen Van A', image: '/images/girl.png' },
    { name: 'Nguyen Van B', image: '/images/girl.png' },
    { name: 'Nguyen Van C', image: '/images/girl.png' },
    { name: 'Nguyen Van A', image: '/images/girl.png' },
    { name: 'Nguyen Van B', image: '/images/girl.png' },
    { name: 'Nguyen Van C', image: '/images/girl.png' },
    // Thêm nhiều dữ liệu khác vào đây
];

const dataChat = [
    { message: 'Xin chào!', avatar: '/images/girl.png', isMine: true },
    { message: 'Chào bạn!', avatar: '/images/girl.png', isMine: false },
    { message: 'Xin chào!', avatar: '/images/girl.png', isMine: true },
    { message: 'Chào bạn!', avatar: '/images/girl.png', isMine: true },
    { message: 'Xin chào!', avatar: '/images/girl.png', isMine: true },
    { message: 'Chào bạn!', avatar: '/images/girl.png', isMine: false },
    { message: 'Xin chào!', avatar: '/images/girl.png', isMine: true },
    { message: 'Chào bạn!', avatar: '/images/girl.png', isMine: false },
    // Thêm nhiều dữ liệu chat khác vào đây
];


const ChatPage = () => {

    const [inputValue, setInputValue] = useState("");
    const [searchText, setSearchText] = useState("");
    const [isSendingChat, setIsSendingChat] = useState(false)
    const [groupCurrent, setGroupCurrent] = useState<any>()
    const [messageHistory, setMessageHistory] = useState<any>([])
    const [debouncedSearch] = useDebounce(searchText, 500)
    const [chatTotal, setChatTotal] = useState(-1)


    const handleChat = async () => {
        if (isSendingChat || (inputValue.length == 0)) {
            return
        }

        setIsSendingChat(true);

        const res = await Service.chat.chat({
            group_id: groupCurrent.id,
            content: inputValue
        })
        setInputValue("")
    }

    return (
        <div className='flex w-full min-h-screen font-sans text-center gap-1 '
            style={{ background: 'linear-gradient(180deg, #FFF 4.04%, rgba(255, 165, 170, 0.61) 51.9%, rgba(254, 0, 0, 0.00) 99.77%)' }}>

            <div className="w-1/3 border border-black">
                <div className="flex h-1/6 border-black items-center">
                    <div className="relative mb-3.5 w-full">
                        <input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            type="text"
                            className=" w-5/6 py-2 pl-9 pr-3 border-zinc-300 dark:text-white dark:bg-transparent dark:border-zinc-800 border border-solid outline-none shadow-none rounded-3xl"
                            placeholder="Tìm kiếm trong chat"
                        />
                        <img src="/icons/icon-search.png" alt="" className="absolute top-1/2 right-12 -translate-y-1/2" />
                    </div>
                </div>
                <div className="flex-col border-black items-center overflow-y-auto gap-5" style={{ maxHeight: '650px' }}>
                    {data.map((item, index) => (
                        <div key={index} className="w-full border-black flex items-center justify-start gap-10">
                            <img src={item.image} alt="" className="w-[100px] border rounded-full" />
                            <div className="w-full text-start text-[30px]">{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="  border border-black w-full min-h-screen max-h-screen">
                <div className=" h-1/6 border-black flex items-center justify-start gap-10">
                    <img src="/images/girl.png" alt="" className="w-1/10 h-1/2 border rounded-full" />

                    <div className=" w-full  text-start text-[30px]">
                        Nguyen Van A
                    </div>

                </div>
                <div>
                    {dataChat.map((item: any, index) => (
                        <div key={index} className={`flex items-start gap-2 mb-2 ${item.isMine ? 'justify-end' : 'justify-start'}`}>
                            {!item.isMine && <img src={item.avatar} alt="" className="w-10 h-10 rounded-full" />}
                            <div className="flex flex-col">
                                <div className="bg-white text-black rounded-lg p-2">{item.message}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <InputChat imagesPreview={[]} inputValue={""} setInputValue={function (value: string): void {
                        throw new Error("Function not implemented.");
                    }} onSend={function (): void {
                        throw new Error("Function not implemented.");
                    }} setImagesPreview={function (value: ImagesPreview): void {
                        throw new Error("Function not implemented.");
                    }} editCurrent={undefined} setEditCurrent={undefined}></InputChat>
                </div>


            </div>

        </div>

    )
}

export default ChatPage
