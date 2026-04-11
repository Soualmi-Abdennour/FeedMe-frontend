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
            <FieldLabel className=" pb-3">{label}</FieldLabel>
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
                            className={`w-[180px] ${errors[name] ? "border-fail-500" : ""}`}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>

                        <SelectContent>
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

            <p className={`mt-4 text-left text-sm ${errors[name] ? "text-fail-500" : ""}`}>
                {errors[name]?.message}
            </p>
        </>
    );
}

export default SelectField;