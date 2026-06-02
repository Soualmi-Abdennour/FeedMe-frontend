import { IFormField } from '@/types/props.types';
import { Controller } from 'react-hook-form';
import { Input } from '../ui/input';
import { Field, FieldLabel, } from '../ui/field'
import { cn } from "@/utils/shadcn.utils"


import { ChevronDown, ChevronUp } from 'lucide-react'

function NumberField({
    name, label, placeholder, disabled = false, autoFocus = false, control, errors, id
}: IFormField) {
    return (
        <>
            <div className={cn(
                "w-full rounded-lg pl-4 border transition-all duration-200",
                "text-neutral-900 text-body",
                "border-primary-500",
                "hover:border-primary-500 hover:bg-primary-100",
                "focus-within:ring-2 focus-within:ring-primary-300",
                errors[name] && "border-fail-500 shadow-fail-400 hover:border-fail-500 focus-within:ring-fail-300",
                disabled && "border-neutral-200 bg-neutral-100 cursor-not-allowed opacity-60 pointer-events-none",
            )}>
                <FieldLabel className="text-neutral-500">{label}</FieldLabel>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <div className="flex items-center">
                            <Input
                                {...field}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    field.onChange(val === "" ? undefined : Number(val));
                                }}
                                id={id}
                                name={name}
                                placeholder={placeholder}
                                type="number"
                                disabled={disabled}
                                autoFocus={autoFocus}
                                className="bg-transparent w-full outline-none border-none text-sm text-neutral-900 placeholder:text-neutral-400"
                            />
                            <div className="flex flex-col shrink-0 h-full  overflow-hidden rounded-r-lg">
                                <button
                                    type="button"
                                    onClick={() => field.onChange((field.value ?? 0) + 1)}
                                    className="flex items-center justify-center w-8 flex-1 hover:text-neutral-500 text-primary-500 transition-colors duration-150 "
                                >
                                    <ChevronUp size={14} strokeWidth={2.5} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => field.onChange(Math.max(0, (field.value ?? 0) - 1))}
                                    className="flex items-center justify-center w-8 flex-1 hover:text-neutral-500 text-primary-500 transition-colors duration-150"
                                >
                                    <ChevronDown size={14} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    )}
                />
            </div>
            <p className={`mt-4 text-left text-sm ${errors[name] ? "text-fail-500" : ""}`}>
                {errors[name] && errors[name].message}
            </p>
        </>
    )
}
export default NumberField
