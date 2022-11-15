import {optionalArray} from "../core/array/array";

type UserNameData = {
    firstName?: string,
    lastName?: string,
    middleName?: string,
}

function getFullName({middleName, lastName, firstName}: UserNameData) {
    return optionalArray([lastName, firstName, middleName]).join(' ')
}

export {
    getFullName,
}