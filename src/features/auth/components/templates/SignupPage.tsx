import React from 'react'
import SignupForm from '../../../auth/components/organism/SignupForm'
import Image from 'next/image'


function SignupPage() {
    return (
        <div className="max-w-[512px] py-5 mx-auto  w-full flex flex-col  gap-3">
            <div className=' px-4 bg-transparent rounded-md mx-auto'>
            <Image src="/FeedMe-Orange.svg" width={60} height={60} alt='logo' ></Image>
            </div>
            <div 
                className="relative shadow-1 pt-6 pb-7 px-20 rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                <Image
                    src={'auth/bck-form.svg'}
                    fill
                    alt='bck'
                    className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                ></Image>
                <div className="text-center">
                    <h4>Welcome!</h4>
                    <p className="body-text text-neutral-500 mb-4">
                        Fill in the information in order to listen with us
                    </p>
                    <SignupForm ></SignupForm>
                </div>
            </div>

        </div>
    )
}

export default SignupPage