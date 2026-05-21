import { IFormField } from "@/types/props.types";
import { Controller } from "react-hook-form";
import { FieldLabel } from "../ui/field";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "../ui/select";
import { cn } from "@/utils/shadcn.utils";

function SelectField({
    name,
    label,
    placeholder,
    disabled = false,
    autoFocus = false,
    control,
    errors,
    id,
    selectList
}: IFormField) {

    return (
    
        <>
            <div className={cn(
                "select-container",
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
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={disabled}
                        >
                            <SelectTrigger
                                id={id}
                                autoFocus={autoFocus}
                            >
                                <SelectValue
                                    className={` bg-transparent w-full outline-none border-none text-neutral-900 placeholder:text-neutral-400`}
                                    placeholder={placeholder} />
                            </SelectTrigger>

                            <SelectContent
                            >
                                {selectList?.map((selectItem) => (
                                    <SelectItem
                                        key={selectItem.key}
                                        value={selectItem.value}
                                    >
                                        {selectItem.value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>
            <p className={`mt-4 text-left text-sm ${errors[name] ? "text-red-500" : ""}`}>
                {errors[name]?.message}
            </p>
        </>
    );
}

export default SelectField;