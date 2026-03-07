"use client"
import { useSearchParams } from 'next/navigation'
import { VERIFY_EMAIL_MESSAGES } from '../../constants/verify.email.constants'
import { IVerifyTokenFormProps } from '../../types/props.types'
import VerifyTokenDefaultView from '../molecules/VerifyTokenDefaultView'
import VerifyTokenProcess from '../organism/VerifyTokenProcess'


function VerifyTokenPage() {
    const params = useSearchParams()
    const token = params.get("token")    
    const props: IVerifyTokenFormProps = {
        displayMessage: VERIFY_EMAIL_MESSAGES["DEFAULT"].dispalyMessage
    }
    if (!token) return <VerifyTokenDefaultView props={props}></VerifyTokenDefaultView>
    return (
        <VerifyTokenProcess token={token}></VerifyTokenProcess>
    )
}

export default VerifyTokenPage
