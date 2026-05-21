import { IFormField } from '@/types/props.types';
import { Controller } from 'react-hook-form';
import { FieldLabel } from '../ui/field';
import { Input } from '../ui/input';



function TimeField({
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
            {label && <FieldLabel className='text-blue-600'>{label}</FieldLabel>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        type="time"
                        disabled={disabled}
                        autoFocus={autoFocus}
                        className={` ${errors[name] ? "border-red-500" : ""}`}
                    ></Input>
                )}
            >
            </Controller>
            <p className={`mt-4 text-left text-sm ${errors[name] ? "text-red-500" : ""}`}>
                {errors[name] && errors[name].message}
            </p>
        </>
    )
}

export default TimeField
