import { IFormField } from '@/types/props.types'
import React, { ReactNode } from 'react'
import TextField from '../atoms/TextField'
import PasswordField from '../atoms/PasswordField'
import SelectField from '../atoms/SelectField'
import TextAreaField from '../atoms/TextAreaField'
import TimeField from '../atoms/TimeField'
import TextAreaAutoSizeField from '../atoms/TextAreaAutoSizeField'

function FormField(props: IFormField) {
    const { type } = props
    const renderField = (): ReactNode => {
        if (type === "text")
            return <TextField {...props}></TextField>
        if (type === "password")
            return <PasswordField {...props}></PasswordField>
        if(type==="select")
            return <SelectField {...props}></SelectField>
        if(type==="textArea")
            return <TextAreaField {...props}></TextAreaField>
        if(type==="textAreaAutoSize")
            return <TextAreaAutoSizeField {...props}></TextAreaAutoSizeField>
        if(type==="time")
            return <TimeField {...props}></TimeField>
        else
            return null
    }
    return <>{renderField()}</>
}

export default FormField
