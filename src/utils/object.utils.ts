
type AnyObject = Record<string,any>

/**
 * Updates a nested property in an object immutably.
 * @param obj - The original object
 * @param path - Array of keys representing the nested path
 * @param value - New value to set
 * @returns A new object with the updated value
 */
export function updateNestedProperty<T extends AnyObject>(
    obj: T,
    path: string[],
    value: any
): T {
    if (path.length === 0) return obj
    
    const [key, ...rest] = path

    return {
        ...obj,
        [key]: rest.length
            ? updateNestedProperty(obj[key] ?? {}, rest, value)
            : value,
    } as T
}


export function areObjectsEqual<T extends Record<string, any>>(obj1: T, obj2: T): boolean {
    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}