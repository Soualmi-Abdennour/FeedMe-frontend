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
            <FieldLabel>{label}</FieldLabel>

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
                            className={`w-[180px] ${errors[name] ? "border-red-500" : ""}`}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>

                        <SelectContent>
                            {selectList?.map((selectItem) => (
                                <SelectItem
                                    key={selectItem.value}
                                    value={selectItem.value}
                                >
                                    {selectItem.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />

            <p className={`mt-4 text-left text-sm ${errors[name] ? "text-red-500" : ""}`}>
                {errors[name]?.message}
            </p>
        </>
    );
}

export default SelectField;