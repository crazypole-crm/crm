import { TableUserNameType } from "./CollumnsData"
import { joinName } from "./userTableDataConvert"
import {UserRole} from "../../../viewModel/users/UserData";

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

function dateCompare(date1: Date | undefined, date2: Date | undefined) {
    if (!date1) {
        return 1
    }
    if (!date2) {
        return -1
    }
    return date1.getTime() - date2.getTime()
}

const userRoleOrder: UserRole[] = ['client', 'trainer', 'admin']

function roleCompare(role1: UserRole, role2: UserRole) {
    return userRoleOrder.indexOf(role1) - userRoleOrder.indexOf(role2)
}

export {
    stringValuesCompare,
    nameCompare,
    dateCompare,
    roleCompare,
}