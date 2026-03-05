import { UserDbModel } from '@/features/user/types/user.types'
import React from 'react'

type StatusType ="SUCCESS"|"FAIL"|"ERROR"
type UserResponseData ={
    user?:UserDbModel,
    accessToken?:string|null,
    refreshToken?:string|null,
}
type APIError={
    field?:string,
    message:string,
}

// in front make the data field type as generic 
type  APIResponse={
    status: StatusType,
    message:String,
    data:AuthResponseData | null,
    errors: APIError[]|null
}

function Page() {
    return (
        <h1 className='text-center text-7xl border-pri'>Here we find the reels</h1>
    )
}

export default Page
