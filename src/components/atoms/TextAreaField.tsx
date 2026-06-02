import { IFormField } from '@/types/props.types';
import { Controller } from 'react-hook-form';
import { FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { cn } from '@/utils/shadcn.utils';



function TextAreaField({
    name,
    label,
    placeholder,
    disabled = false,
    autoFocus = false,
    control,
    errors,
    id
}: IFormField) {
    return (
        <div className='w-full flex flex-col gap-2 mb-2'>
            <div className={cn(
                "w-full rounded-lg pl-4 py-1.5 border transition-all duration-200",
                "text-neutral-900 text-body",
                "border-primary-500 shadow-primary-400",
                "hover:border-primary-500 hover:bg-primary-100",
                "focus-within:ring-2 focus-within:ring-primary-300 focus:bg-primary-300",
                errors[name] && "border-fail-500 shadow-fail-400 hover:border-fail-500 focus-within:ring-fail-300",
                disabled && "border-neutral-200 bg-neutral-100 cursor-not-allowed opacity-60 pointer-events-none",
            )}>
                <FieldLabel className="text-neutral-500">{label}</FieldLabel>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            id={id}
                            name={name}
                            placeholder={placeholder}
                            disabled={disabled}
                            autoFocus={autoFocus}
                            className={`textArea-container w-full bg-transparent hover:outline-none focus:outline-none outline-none border-none text-neutral-900 placeholder:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-h-[100px] resize-none"`}
                        ></Textarea>
                    )}
                >
                </Controller>
            </div>
                <p className={`text-left text-sm ${errors[name] ? "text-fail-500" : ""}`}>
                    {errors[name] && errors[name].message}
                </p>
        </div>
    )
}

export default TextAreaField
