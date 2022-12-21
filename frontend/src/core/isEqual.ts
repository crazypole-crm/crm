function isEqual(prevData: any, currData: any): boolean {
    return JSON.stringify(prevData) === JSON.stringify(currData)
}

export {
    isEqual
}