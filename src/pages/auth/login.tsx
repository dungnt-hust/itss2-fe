
import { NextPage } from 'next';
// import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router';
// import { useAuthStore } from '~/store/useAuthStore' // import our useAuthStore

import { useUser } from '@/hooks/stores/useUser';
import { Button, Form, Input } from 'antd';

const SignIn: NextPage = (props) => {
    const { login } = useUser()
    const router = useRouter()

    const { token } = useUser()
    console.log('token', token)
    if (token) router.push('/')

    const onFinish = async (values: any) => {
        await login(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        username?: string;
        password?: string;
    };

    return (
        <div className='relative flex w-full min-h-screen font-serif  items-center justify-center text-center'
            style={{ background: 'linear-gradient(90.18deg, #FFF1F1 0.18%, rgba(255,66,66,0.739583) 37.47%, rgba(255,105,108,0) 99.88%)' }}>
            <div className=' absolute w-[559px] h-[713px] bg-white border-2 border-black rounded-2xl mx-auto my-auto'>
                <div className='grid grid-cols-[auto_1fr] m-6 justify-between'>
                    <div className=''>
                        <img src="/images/login_logo.png" alt="" />
                    </div>
                    <div className='flex h-full justify-end items-start '>
                        <div className='h-full flex items-end justify-end flex-col'>

                            <div className='text-[#D324D7;] text-[32px] underline mr-10 '>
                                Login
                            </div>
                        </div>
                        <img src="/images/cancel.png" alt="" />
                    </div>


                </div>

                <div className='w-[507.68px] h-[350.24px] top-[144px] m-6 left-[440px] mt-10 text-[20px]'>
                    <div>
                        <Form
                            name="login"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"

                        >
                            <Form.Item<FieldType>
                                label="Tên đăng nhập"
                                name="username"
                                validateTrigger="onBlur"
                                rules={[{ max: 20 }]}
                            >
                                <Input className='border-none rounded-3xl bg-[#D9D9D9] h-12' />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Mật khẩu"
                                name="password"
                            >
                                <Input.Password className='border-none rounded-3xl bg-[#D9D9D9] h-12' />
                            </Form.Item>

                            <Form.Item  >
                                <Button type="primary" htmlType="submit" className='w-[162px] h-12 bg-[#D324D7] text-white border-none rounded-3xl mt-12 text-[20px]'>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>

                </div>

                <div className=" text-center text-[24px]">
                    <div className='text-center'>Hoặc</div>
                    <div className="ml-[20px] ">
                        <img src="/images/google_login.png" alt="" />
                    </div>
                </div>
                <div className=" flex h-20 justify-center text-center items-center gap-6 text-[18px]">
                    <div className=""> Bạn chưa có tài khoản ?</div>
                    <div className="flex w-[100px] items-start underline text-[#EA1818] cursor-pointer" onClick={() => router.push(`/auth/register`)}> Đăng ký</div>
                </div>
            </div>
        </div>
        // <div>
        //   <div className="title">
        //     <h2>Login</h2>
        //   </div>
        //   <div className="container form">
        //     <label>
        //       <b>Username</b>
        //     </label>
        //     <input
        //       type="text"
        //       className="input"
        //       placeholder="Enter Username"
        //       name="uname"
        //       value={userInfo.email}
        //       onChange={(event) => (userInfo.email = event.target.value)}
        //       required
        //     />
        //     <label>
        //       <b>Password</b>
        //     </label>
        //     <input
        //       type="password"
        //       className="input"
        //       placeholder="Enter Password"
        //       value={userInfo.password}
        //       onChange={(event) => (userInfo.password = event.target.value)}
        //       name="psw"
        //       required
        //     />
        //     <button onClick={login} className="button">
        //       Login
        //     </button>
        //   </div>
        // </div>
    )
}

export default SignIn
