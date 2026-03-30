import { IFormField } from '@/types/props.types'
import React, { ReactNode } from 'react'
import TextField from '../atoms/TextField'
import PasswordField from '../atoms/PasswordField'

function FormField(props: IFormField) {
    const { type } = props
    const renderField = (): ReactNode => {
        if (type === "text")
            return <TextField {...props}></TextField>
        if (type === "password")
            return <PasswordField {...props}></PasswordField>
        else
            return null
    }
    return <>{renderField()}</>
}

export default FormField
