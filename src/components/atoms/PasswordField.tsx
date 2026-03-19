import { IFormField } from '@/types/props.types'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Field, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import TextField from './TextField'
import { Button } from '../ui/button'
import { Eye, EyeClosed } from 'lucide-react'
import { cn } from "@/lib/utils"

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
        <div className={cn(
            "w-full rounded-lg px-4 py-3 border transition-all duration-200",
            "text-neutral-900 text-body",
            "border-primary-500 shadow-primary-400",
            "hover:border-primary-500 hover:bg-primary-100",
            "focus-within:ring-2 focus-within:ring-primary-300",
            errors[name] && "border-fail-500 shadow-fail-400 hover:border-fail-500 focus-within:ring-fail-300" ,
            disabled && "border-neutral-200 bg-neutral-100 cursor-not-allowed opacity-60 pointer-events-none",
        )}>
            <FieldLabel>{label}</FieldLabel>
            <div className="flex justify-between">
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
                            className={`  bg-transparent outline-none border-none text-neutral-900 placeholder:text-neutral-400`}
                        ></Input>
                    )}
                >
                </Controller>
                
                <Button
                    type='button'
                    variant="primary"
                    onClick={() => setShowPassword((state) => !state)}
                    className={`bg-transparent rounded-full hover:bg-neutral-100 focus:bg-transparent`}
                >
                    {showPassword ? (
                        <EyeClosed className="flex justify-end"></EyeClosed>
                    ) : (
                        <Eye></Eye>
                    )}
                </Button>
            </div>
        </div>
            <p className={`mt-4 text-left text-sm ${errors[name] ? "text-fail-500" : ""}`}>
                {errors[name] && errors[name].message}
            </p>
        </>
    )
}

export default PasswordField
