import React from 'react'
import SignupForm from '../../../auth/components/organism/SignupForm'
import Image from 'next/image'


function SignupPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-visible">
            <Image
                    src={'sign-up/bck-form.svg'}
                    fill
                    alt='bck'
                    className='absolute top-0 left-0 -z-10 object-cover '
                ></Image>
            <div 
            className=" rounded-2xl  shadow-modal">
                <div className="text-center mb-6">
                    <h1 className="text-header-3">Welcome!</h1>
                    <p className="body-text text-neutral-500">
                        Fill in the information in order to listen with us
                    </p>
                </div>
                <div className=" flex justify-center translate-x-1/2">
                    <SignupForm ></SignupForm>
                </div>
                
            </div>

        </div>
    )
}

export default SignupPage
