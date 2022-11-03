import { ColumnsType } from "antd/lib/table";
import { LocalStorage, STORAGE_KEYS } from "../../../core/localStorage/localStorage";
import { UserNameCell } from "./cells/UserNameCell";
import { DataType } from "./UsersTable";

type CollumnIdType = 'name' | 'birthDay' | 'email' | 'phone' | 'lastVisit'

type TableUserNameType = {
    id: string,
    firstName: string;
    lastName: string;
    middleName: string;
}

function normalizeDate(date: string) {
    return date.length === 1
        ? `0${date}`
        : date
}

function dateToString(date: Date) {
    return `${normalizeDate(date.getDate().toString())}.${normalizeDate(date.getMonth().toString())}.${date.getFullYear()}`
}

const COLLUMN_TO_TITLE_MAP: Map<CollumnIdType, string> = new Map([
    ['name', 'Имя'],
    ['birthDay', 'День рождения'],
    ['email', 'Email'],
    ['phone', 'Номер телефона'],
    ['lastVisit', 'Последний визит'],
])

const DISABLED_COLLUMNS: CollumnIdType[] = ['name']

function joinName(name: TableUserNameType) {
    return `${name.firstName} ${name.lastName} ${name.middleName}`
}

const COLLUMNS: ColumnsType<DataType> = [
    {
        title: COLLUMN_TO_TITLE_MAP.get('name'),
        dataIndex: 'name',
        render: name => <UserNameCell name={name}/>,
        sorter: (a, b) => joinName(a.name).localeCompare(joinName(b.name)),
        width: 400
    },
    {
        title: COLLUMN_TO_TITLE_MAP.get('birthDay'),
        dataIndex: 'birthDay',
        render: dateToString,
        sorter: (a, b) =>  a.birthDay.getTime() - b.birthDay.getTime()
    },
    {
        title: COLLUMN_TO_TITLE_MAP.get('email'),
        dataIndex: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
        title: COLLUMN_TO_TITLE_MAP.get('phone'),
        dataIndex: 'phone',
    },
    {
        title: COLLUMN_TO_TITLE_MAP.get('lastVisit'),
        dataIndex: 'lastVisit',
        render: dateToString,
        sorter: (a, b) =>  a.birthDay.getTime() - b.birthDay.getTime()
    },
];

const COLLUMS_IDS: CollumnIdType[] = ['name', 'birthDay', 'email', 'phone', 'lastVisit']

type VisibleCollumsData = {
    [item: string]: boolean
}

function getDefalutVisibleCollums() {
    const defaultVisibleCollumsId: VisibleCollumsData = {}
    COLLUMS_IDS.forEach(id => {
        defaultVisibleCollumsId[id] = true
    })
    return defaultVisibleCollumsId
}

function getVisibleCollumnsFromLocalStorage(): VisibleCollumsData {
    const rawData = LocalStorage.getValue<VisibleCollumsData>(STORAGE_KEYS.VISIBLE_COLLUMNS)
    if (!rawData) {
        return getDefalutVisibleCollums()
    }
    return rawData
}

function setVisibleCollumnsToLocalStorage(visibleCollumns: VisibleCollumsData) {
    LocalStorage.setValue<VisibleCollumsData>(STORAGE_KEYS.VISIBLE_COLLUMNS, visibleCollumns)
}

export type {
    TableUserNameType,
    CollumnIdType,
    VisibleCollumsData,
}

export {
    COLLUMNS,
    COLLUMS_IDS,
    COLLUMN_TO_TITLE_MAP,
    DISABLED_COLLUMNS,

    joinName,
    setVisibleCollumnsToLocalStorage,
    getVisibleCollumnsFromLocalStorage,
}