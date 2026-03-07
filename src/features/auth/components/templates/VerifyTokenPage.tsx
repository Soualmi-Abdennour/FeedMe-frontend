"use client"
import { useSearchParams } from 'next/navigation'
import VerifyTokenStateView from '../organism/VerifyTokenProcess'
import VerifyTokenForm from '../molecules/VerifyTokenView'
import { VERIFY_EMAIL_MESSAGES } from '../../constants/verify.email.constants'
import { IVerifyTokenFormProps } from '../../types/props.types'


function VerifyTokenPage() {
    const params = useSearchParams()
    const token = params.get("token")    
    const props: IVerifyTokenFormProps = {
        displayMessage: VERIFY_EMAIL_MESSAGES["DEFAULT"].dispalyMessage
    }
    if (!token) return <VerifyTokenForm props={props}></VerifyTokenForm>
    return (
        <VerifyTokenStateView token={token}></VerifyTokenStateView>
    )
}

export default VerifyTokenPage
