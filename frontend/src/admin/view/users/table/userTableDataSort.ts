import { TableUserNameType } from "./CollumnsData"
import { joinName } from "./userTableDataConvert"

function stringValuesCompare(value1: string, value2: string) {
    if (value1.length < value2.length) {
        return -1
    }
    if (value1.length > value2.length) {
        return 1
    }
    return value1.localeCompare(value2)
}


function nameCompare(name1: TableUserNameType, name2: TableUserNameType) {
    const fullName1 = joinName(name1)
    const fullName2 = joinName(name2)
    return stringValuesCompare(fullName1, fullName2)
}

function dateCompare(date1: Date, date2: Date) {
    return date1.getTime() - date2.getTime()
}

export {
    stringValuesCompare,
    nameCompare,
    dateCompare,
}