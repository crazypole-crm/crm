import { CollumnIdType } from "./CollumnsData"

const COLLUMS_IDS: CollumnIdType[] = ['name', 'birthDay', 'email', 'phone', 'lastVisit']

const COLLUMN_TO_TITLE_MAP: Map<CollumnIdType, string> = new Map([
    ['name', 'Имя'],
    ['birthDay', 'День рождения'],
    ['email', 'Email'],
    ['phone', 'Номер телефона'],
    ['lastVisit', 'Последний визит'],
])

const DISABLED_COLLUMNS: CollumnIdType[] = ['name']

export {
    COLLUMS_IDS,
    COLLUMN_TO_TITLE_MAP,
    DISABLED_COLLUMNS,
}