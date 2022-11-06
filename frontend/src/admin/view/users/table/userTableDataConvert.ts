import { TableUserNameType } from "./CollumnsData"

function normalizeDate(date: string) {
    return date.length === 1
        ? `0${date}`
        : date
}

function dateToString(date: Date) {
    return `${normalizeDate(date.getDate().toString())}.${normalizeDate(date.getMonth().toString())}.${date.getFullYear()}`
}

function joinName(name: TableUserNameType) {
    return `${name.firstName} ${name.lastName} ${name.middleName}`
}

export {
    normalizeDate,
    dateToString,
    joinName,
}