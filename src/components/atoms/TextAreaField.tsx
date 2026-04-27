import { IFormField } from '@/types/props.types';
import { Controller } from 'react-hook-form';
import { FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';



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
        <>
        <div className=''>
            <FieldLabel className='py-1'>{label}</FieldLabel>
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
                        className={` ${errors[name] ? "border-fail-500" : ""}`}
                    ></Textarea>
                )}
            >
            </Controller>
            <p className={`mt-4 text-left text-sm ${errors[name] ? "text-fail-500" : ""}`}>
                {errors[name] && errors[name].message}
            </p>
        </div>
            
        </>
    )
}

export default TextAreaField
