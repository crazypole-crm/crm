import { ColumnsType } from "antd/lib/table";
import { LocalStorage, STORAGE_KEYS } from "../../../../core/localStorage/localStorage";
import { UserNameCell } from "./cells/UserNameCell";
import { dateCompare, nameCompare, roleCompare, stringValuesCompare } from "./userTableDataSort";
import { DataType } from "./UsersTable";
import { COLLUMN_TO_TITLE_MAP, COLLUMS_IDS } from "./userTableDataConsts";
import { dateToString } from "./userTableDataConvert";
import {UserRoleCell} from "./cells/UserRoleCell";

type CollumnIdType = 'name' | 'role' | 'birthDay' | 'email' | 'phone' | 'lastVisit'

type TableUserNameType = {
    id: string,
    firstName?: string;
    lastName?: string;
    middleName?: string;
}

const COLLUMNS: ColumnsType<DataType> = [
    {
        title: COLLUMN_TO_TITLE_MAP.get('name'),
        dataIndex: 'name',
        render: name => <UserNameCell name={name}/>,
        sorter: (a, b) => nameCompare(a.name, b.name),
        width: 400,
        defaultSortOrder: 'ascend'
    },
    {
        title: COLLUMN_TO_TITLE_MAP.get('role'),
        dataIndex: 'role',
        render: role => <UserRoleCell role={role}/>,
        sorter: (a, b) => roleCompare(a.role, b.role),
    },
    {
        title: COLLUMN_TO_TITLE_MAP.get('birthDay'),
        dataIndex: 'birthDay',
        render: dateToString,
        sorter: (a, b) => dateCompare(a.birthDay, b.birthDay)
    },
    {
        title: COLLUMN_TO_TITLE_MAP.get('email'),
        dataIndex: 'email',
        sorter: (a, b) => stringValuesCompare(a.email, b.email),
    },
    {
        title: COLLUMN_TO_TITLE_MAP.get('phone'),
        dataIndex: 'phone',
        render: phone => phone || '-',
    },
    {
        title: COLLUMN_TO_TITLE_MAP.get('lastVisit'),
        dataIndex: 'lastVisit',
        render: dateToString,
        sorter: (a, b) => dateCompare(a.lastVisit, b.lastVisit)
    },
];

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

    setVisibleCollumnsToLocalStorage,
    getVisibleCollumnsFromLocalStorage,
}