import React from 'react'
import SubmitButton from '@/components/atoms/SubmitButton'
import Image from 'next/image'
import { IVerificationViewProps } from '../../types/props.types'
import { cn } from '@/utils/shadcn.utils'


const titleColors = {
    "ERROR": "text-error-500",
    "FAIL": "text-fail-500",
    "SUCCESS": "text-success-500",
    "LOADING": "text-primary-500",
    "DEFAULT": "text-neutral-900",
}
function VerificationView({ props }: { props: IVerificationViewProps }) {
    const { displayMessage, buttonMessage, onClick, buttonState, buttonDisabled,imageUrl,title }=props
    return (
        <div className='flex flex-col  max-w-[440px] mx-auto justify-end items-center min-h-[600px] relative p-9'>
            <div className='flex flex-col justify-end items-center mx-auto absolute bottom-15 px-9'>
                <h2 className={cn("text-center text-2xl font-bold", titleColors[buttonState ?? "DEFAULT"])}>{title}</h2>
                <p className='text-center pb-5 text-neutral-500'>{displayMessage}</p>
            {buttonMessage && (
                <SubmitButton disabled={buttonDisabled} state={buttonState} onClick={onClick}>{buttonMessage}</SubmitButton>
                )}
            </div>    
            <Image
                src={imageUrl || ''}
                alt='loading'
                fill
                className='-z-10 shadow-1 rounded-lg my-5'
            ></Image>
            
        </div>
    )
}

export default VerificationView
