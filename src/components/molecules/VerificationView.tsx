import React from 'react'
import SubmitButton from '@/components/atoms/SubmitButton'
import { IVerificationViewProps } from '../../types/props.types'



function VerificationView({ props }: { props: IVerificationViewProps }) {
    const { displayMessage, buttonMessage, onClick, buttonState, buttonDisabled }=props
    return (
        <div className='flex flex-col max-w-[500px] mx-auto justify-end items-center min-h-[500px]'>
            <h1 className='text-center'>{displayMessage}</h1>
            {buttonMessage && (
                <SubmitButton disabled={buttonDisabled} state={buttonState} onClick={onClick}>{buttonMessage}</SubmitButton>
                )}
        </div>
    )
}

export default VerificationView
