
import { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Service } from '@/services/app.service';
import { Select } from 'antd';
import { useUser } from '@/hooks/stores/useUser';

const SignUp: NextPage = (props) => {
    const router = useRouter()
    const { token } = useUser()

    if (token) router.push('/');

    const [infoRegister, setInfoRegister] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        confirm: false,
    })

    const handleChangeInfo = (item: any) => {
        const { field, value } = item

        setInfoRegister(prev => ({
            ...prev,
            [field]: value
        } as any))
    }

    const onFinish = async (e: any) => {
        try {
            e.preventDefault();

            const res = await Service.auth.register(infoRegister.username, infoRegister.password, +infoRegister.age, +infoRegister.gender);
            if (res.data) {
                router.push('/auth/login')
            }
        } catch (error) {
            console.log('error', error)
        }

    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    }

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible((prevState) => !prevState);
    }


    //useEffect(() => { }, [])

    return (
        <div className='relative flex w-full min-h-screen font-serif items-center justify-center'
            style={{ background: 'linear-gradient(90.18deg, #FFF1F1 0.18%, rgba(255, 66, 66, 0.739583) 37.47%, rgba(255, 105, 108, 0) 99.88%)' }}
        >
            <div className='absolute w-[687px] h-[768px] bg-white border-2 border-black rounded-2xl m-auto'>
                <div className='grid grid-cols-[auto_1fr] m-6 justify-between '>
                    <div className=''>
                        <img src="/images/login_logo.png" alt="" />
                    </div>
                    <div className='flex h-full justify-end items-start '>
                        <div className='h-full flex items-end justify-end flex-col'>

                            <div className='text-[#D324D7;] text-[32px] underline mr-10 '>
                                Sign up
                            </div>
                        </div>
                        <img src="/images/cancel.png" alt="" />
                    </div>


                </div>

                <div className='w-[623.68px] h-[350.24px] top-[144px] m-6 left-[440px] mt-10 text-[20px] mx-auto'>
                    <div>
                        <form action="" name='form' autoComplete='off'>
                            <div className='relative'>
                                <label htmlFor="username">Tên đăng nhập</label>
                                <input type="text" id="username" name='username' className='border-none rounded-3xl bg-[#D9D9D9] h-8 w-full'
                                    onChange={(e) => handleChangeInfo({ field: "username", value: e.target.value })} />

                            </div>

                            <div className='relative'>
                                <label htmlFor="password">Mật khẩu</label>
                                <div className='relative flex items-center justify-center'>
                                    <input type={isPasswordVisible ? "text" : "password"} id="password" name="password" className='border-none rounded-3xl bg-[#D9D9D9] h-8 w-full'

                                        onChange={(e) => handleChangeInfo({ field: "password", value: e.target.value })}
                                    />
                                    <span
                                        className="absolute items-center right-4 my-auto cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {isPasswordVisible ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 576 512"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5 text-gray-700"
                                            >
                                                <path fill="currentColor"
                                                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                                </path>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 576 512"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5 text-gray-700"
                                            >
                                                <path fill="currentColor"
                                                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                                </path>
                                            </svg>
                                        )}
                                    </span>
                                </div>

                            </div>

                            <div className='relative'>
                                <label htmlFor="password">Nhập lại mật khẩu</label>
                                <div className='relative flex items-center justify-center'>
                                    <input type={isConfirmPasswordVisible ? "text" : "password"}
                                        id="confirm-password" name="confirm-password" className='border-none rounded-3xl bg-[#D9D9D9] h-8 w-full'
                                        onChange={(e) => handleChangeInfo({ field: "confirmPassword", value: e.target.value })}
                                    />
                                    <span
                                        className="absolute items-center right-4 my-auto cursor-pointer"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {isConfirmPasswordVisible ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 576 512"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5 text-gray-700"
                                            >
                                                <path fill="currentColor"
                                                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                                </path>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 576 512"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5 text-gray-700"
                                            >
                                                <path fill="currentColor"
                                                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                                </path>
                                            </svg>
                                        )}
                                    </span>
                                </div>

                            </div>

                            <div className='relative w-full grid grid-cols-2 my-10 register-select'>
                                <div className='flex items-center justify-center cursor-pointer'>
                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block">
                                        Tôi là</span>
                                    <div className='border bg-[#D9D9D9] rounded-lg overflow-hidden ml-8 w-[120px] flex items-center justify-center text-center'>
                                        <div onClick={() => handleChangeInfo({ field: "gender", value: 1 })} className='border border-solid border-black rounded-l-lg has-[:checked]:bg-green-900 w-1/2' >
                                            Nam
                                        </div>
                                        <div onClick={() => handleChangeInfo({ field: "gender", value: 2 })} className='border border-solid border-black rounded-r-lg w-1/2'>
                                            Nữ
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center gap-1 text-[20px] font-serif '>
                                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block">
                                        Tuổi</span>
                                    <Select
                                        className='border border-solid border-black rounded-lg bg-[#D9D9D9] w-[80px] font-serif ml-8'
                                        defaultValue="18"
                                        options={Array.from({ length: 83 }, (_, i) => i + 18).map((value) => (
                                            { value: value.toString(), label: value.toString() }
                                        ))}
                                        onChange={(e) => handleChangeInfo({ field: "age", value: e })}

                                    />
                                </div>
                            </div>

                            <div className=" mt-16 mx-auto">
                                <div className=' flex  ml-24 items-center'>
                                    <input type="checkbox" id="confirm" name="confirm" className=' w-9 h-9 mx-[35px] border rounded-lg' onClick={() => handleChangeInfo({ field: "confirm", value: !infoRegister.confirm })} />
                                    <label htmlFor="confirm" className=' w-[325px]'> Tôi xác nhận tôi trên 18 , tôi đông ý với điêu khoản sử dụng và bảo mật</label>
                                </div>
                            </div>

                            <div className=" text-center text-[24px] mx-auto  mt-12">
                                <div className='text-center ' >Hoặc</div>
                                <div className="ml-12 ">
                                    <img src="/images/google_register.png" alt="" />
                                </div>
                            </div>

                            <div className=" text-center text-[24px] mx-auto mt-4">
                                <button onClick={(e) => onFinish(e)} className='w-[162px] h-12 bg-[#D324D7] text-white border-none rounded-3xl text-[20px] active:bg-green-600'>
                                    Đăng ký
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUp
