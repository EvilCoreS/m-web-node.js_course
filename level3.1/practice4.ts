function mapObject<T extends Record<string, T[keyof T]>, U>(obj: T, transformer: (x: T[keyof T]) => U) {
    const newObj: Record<keyof T, U> | Record<string, U> = {}
    for (const k in obj) {
        newObj[k] = transformer(obj[k])
    }
    return newObj
}
console.log(mapObject({"roma": {test: 1}, "vasya": 2}, (x) => typeof x === "object"));