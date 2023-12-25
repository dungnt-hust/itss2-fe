interface USER_INFO {
    id: number
    email: any
    mobile: any
    username: any
    address: string
    avatar: string
    full_name: string
    status: number
    last_active: any
    type: number
    referral_code: string
    created_time: string
    updated_time: string
    twitter_id: number
    username_twitter: string
    description: string
    is_actived: number
    location: any
    banner: any
    blue_check: number
  }
  
  interface User {
    // id?: number
    // address?: Address
    // email?: string
    // name?: string
    // username?: string
    // fullName?: string
    // avatar?: string
    // mobile?: string
    // ref?: string
    // type?: number
    // status?: number
    // lastActive?: string
    // createdTime?: string
    // updatedTime?: string
    // token?: string
    // user_info?: USER_INFO
    // expiredAt?: any
    // geo?: any
    // ipAddr?: any
    // twitterId?: any
    // discordId?: any
    // login:any
    // logout(): void
    // refreshUserInfo(): Promise<void>
    // reset(): void
    [key : string] : any
  }
  