import { IFormField } from '@/types/props.types'
import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Button } from '../ui/button'
import { FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

function PasswordField({
    name,
    label,
    placeholder,
    disabled,
    autoFocus,
    id,
    errors,
    control
}: IFormField) {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    return (
        <>
            <FieldLabel className='text-green-600'>{label}</FieldLabel>
            <div>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={id}
                            name={name}
                            placeholder={placeholder}
                            type="text"
                            disabled={disabled}
                            autoFocus={autoFocus}
                            className={` ${errors[name] ? "border-red-500" : ""}`}
                        ></Input>
                    )}
                >
                </Controller>
                <Button
                    type='button'
                    variant="ghost"
                    onClick={() => setShowPassword((state) => !state)}
                >
                    {showPassword ? (
                        <EyeClosed></EyeClosed>
                    ) : (
                        <Eye></Eye>
                    )}
                </Button>
            </div>
            <p className={`mt-4 text-left text-sm ${errors[name] ? "text-red-500" : ""}`}>
                {errors[name] && errors[name].message}
            </p>
        </>
    )
}

export default PasswordField
