import { TableUserNameType } from "./CollumnsData"
import {optionalArray} from "../../../../core/array/array";

function normalizeDate(date: string | number) {
    return String(date).length === 1
        ? `0${date}`
        : date
}

function dateToString(date: Date | undefined) {
    if (!date) {
        return '-'
    }
    return `${normalizeDate(date.getDate().toString())}.${normalizeDate(date.getMonth().toString())}.${date.getFullYear()}`
}

function joinName(name: TableUserNameType) {
    return optionalArray([name.firstName, name.lastName, name.middleName]).join(' ')
}

export {
    normalizeDate,
    dateToString,
    joinName,
}