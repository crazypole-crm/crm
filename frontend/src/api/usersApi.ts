import {HttpStatus} from "../core/http/HttpStatus";
import {UserRole} from "../admin/viewModel/users/UserData";
import {generateUuid} from "../core/uuid/generateUuid";

type Api_UsersData = {
    id: string,
    email: string,
    avatarUrl?: string,
    phone?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    role: UserRole,
    birthday?: string,
    lastVisit?: string,
}

function getUsersDataByIds(userIds: Array<string>): Promise<Array<Api_UsersData>> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([])
        }, 1000)
    })
    // return fetch('/get/users_data', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         ids: userIds,
    //     })
    // })
    //     .then(response => {
    //         switch (response.status) {
    //             case HttpStatus.OK:
    //                 return response.json()
    //             case HttpStatus.UNAUTHORIZED:
    //                 // goToUrl('/auth')
    //                 return Promise.reject(response)
    //             default:
    //                 return Promise.reject(response.status)
    //         }
    //     })
}

function getAllUsersData(): Promise<Array<Api_UsersData>> {
    return fetch('/get/users_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response.json())
                default:
                    return Promise.reject(response)
            }
        })
}

type Api_EditUserData = {
    id: string,
    email: string,
    role: UserRole,
    avatarUrl?: string,
    phoneNumber?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    birthday?: string,
}

function editUser(userData: Api_EditUserData): Promise<void> {
    return fetch('/update/user_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve()
                default:
                    return Promise.reject(response)
            }
        })
}

type Api_CreateUserData = {
    email: string,
    role: UserRole,
    password: string,
    avatarUrl?: string,
    phoneNumber?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    birthday?: string,
}

function createUser(userData: Api_CreateUserData): Promise<{id: string}> {
    return fetch('/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response.json())
                default:
                    return Promise.reject(response)
            }
        })
}

function deleteUser(userId: string): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

const UsersApi = {
    getUsersDataByIds,
    getAllUsersData,
    editUser,
    createUser,
    deleteUser,
}

export type {
    Api_UsersData,
}

export {
    UsersApi,
}