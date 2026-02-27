"use client"
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useVerifyEmailQuery } from '../../store/user.api.slice'
import VerifyEmailUI from '../organism/VerifyEmailTokenUI'

function VerifyEmailTokenPage() {
    // const params = useParams()
    // const token = params.token
    // const response = useVerifyEmailQuery(token)
    // const {isSuccess,isError,isLoading}=response
    const isError=false
    const isSuccess=false
    const isLoading=true
    return (
        <VerifyEmailUI
            isError={isError}
            isSuccess={isSuccess}
            isLoading={isLoading}
        ></VerifyEmailUI>
    )
}

export default VerifyEmailTokenPage
