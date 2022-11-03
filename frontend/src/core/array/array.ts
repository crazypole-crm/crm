

function optionalArray<T>(array: Array<T | null | undefined | false>): Array<T> {
    const newArray: T[] = []
    array.forEach(item => {
        !!item && newArray.push(item)
    })
    return newArray
}

export {
    optionalArray,
}