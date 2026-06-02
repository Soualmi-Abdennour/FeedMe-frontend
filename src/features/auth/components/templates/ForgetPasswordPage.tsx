import React from 'react'
import ForgetPasswordForm from '../organism/ForgetPasswordForm'
import Image from 'next/image'


function ForgetPasswordPage() {
    return (
        <div className="max-w-[512px] py-5 mx-auto  w-full flex flex-col  gap-5    ">
            <div className='py-2 px-4 bg-transparent rounded-md mx-auto'>
            <Image src="/FeedMe-Orange.svg" width={60} height={60} alt='logo' ></Image>
            </div>
            <div 
                className="relative shadow-1 pt-[80px] pb-[80px] px-20 rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                <Image
                    src={'auth/bck-form.svg'}
                    fill
                    alt='bck'
                    className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                ></Image>
                <div className="text-center">
                    <h4>Welcome!</h4>
                    <p className="body-text text-neutral-500  mb-4">
                        Fill in the information in order to listen with us
                    </p>
                    <ForgetPasswordForm ></ForgetPasswordForm>
                </div>
            </div>

        </div>
    )
}

export default ForgetPasswordPage
