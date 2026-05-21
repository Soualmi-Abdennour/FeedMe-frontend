export const toggleValue = <T,>(value: T, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
        setter(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        )
    } 