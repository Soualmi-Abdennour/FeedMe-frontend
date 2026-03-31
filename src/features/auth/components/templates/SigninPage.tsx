import { Link } from 'lucide-react'
import SigninForm from '../organism/SigninForm'
import Image from 'next/image'
import React from 'react'


function SigninPage() {
    return (
        <div className="max-w-[512px] pt-[86px] pb-52 mx-auto  w-full flex flex-col  gap-5    ">
            <div className='py-2 px-4 bg-orange-500 rounded-md mx-auto'>
                <h4 className='text-white'>FeedMe</h4>
            </div>
            <div 
                className="relative shadow-1 pt-[80px] pb-[130px] px-20 rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                <Image
                    src={'sign-up/bck-form.svg'}
                    fill
                    alt='bck'
                    className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                ></Image>
                <div className="text-center">
                    <h4>Welcome!</h4>
                    <p className="body-text text-neutral-500  mb-8">
                        Fill in the information in order to listen with us
                    </p>
                    <SigninForm ></SigninForm>
                </div>
            </div>

        </div>
    )
}

export default SigninPage
