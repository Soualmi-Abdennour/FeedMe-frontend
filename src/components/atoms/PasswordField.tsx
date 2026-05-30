import { IFormField } from '@/types/props.types'
import { Eye, EyeClosed } from 'lucide-react'
import { cn } from "@/utils/shadcn.utils"
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
            <div className={cn(
                "w-full flex rounded-lg px-4 py-1.5 border transition-all duration-200",
                "text-neutral-900 text-body",
                "border-primary-500 shadow-primary-400",
                "hover:border-primary-500 hover:bg-primary-100",
                "focus-within:ring-2 focus-within:ring-primary-300",
                errors[name] && "border-fail-500 shadow-fail-400 hover:border-fail-500 focus-within:ring-fail-300",
                disabled && "border-neutral-200 bg-neutral-100 cursor-not-allowed opacity-60 pointer-events-none",
            )}>
                <div className='flex-1'>
                    <FieldLabel className='text-neutral-500'>{label}</FieldLabel>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id={id}
                                name={name}
                                placeholder={placeholder}
                                type={showPassword ? "text" : "password"}  
                                disabled={disabled}
                                autoFocus={autoFocus}
                                className="w-full bg-transparent outline-none border-none text-neutral-900 placeholder:text-neutral-400"
                            />
                        )}
                    />
                </div>

                <Button
                    type='button'
                    variant="ghost"
                    onClick={() => setShowPassword((state) => !state)}
                    className="p-0"
                >
                    {showPassword ? (
                        <EyeClosed className="size-10" size={40} />
                    ) : (
                        <Eye className='size-10' size={40} />
                    )}
                </Button>
            </div>

            <p className={`mt-4 text-left text-sm ${errors[name] ? "text-fail-500" : ""}`}>
                {errors[name] && errors[name].message}
            </p>
        </>
    )
}

export default PasswordField