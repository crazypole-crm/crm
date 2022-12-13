import {HttpStatus} from "../core/http/HttpStatus";
import {Api_Role} from "../common/role/Api_Role";
import {goToUrl} from "../core/link/goToUrl";

type Api_UsersData = {
    id: string,
    email: string,
    avatarUrl?: string,
    phone?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    birthday?: string,
    lastVisit?: string,
    role: Api_Role,
}

function getUsersDataByIds(userIds: Array<string>): Promise<Array<Api_UsersData>> {
    return fetch('/get/users_data', {
        method: 'POST',
        body: JSON.stringify({
            ids: userIds,
        })
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return response.json()
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
                default:
                    return Promise.reject(response.status)
            }
        })
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
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type Api_EditUserData = {
    id: string,
    email: string,
    avatarUrl?: string,
    phoneNumber?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    birthday?: string,
    role: Api_Role,
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
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type Api_CreateUserData = {
    email: string,
    role: Api_Role,
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
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

function deleteUsers(usersId: Array<string>): Promise<void> {
    return fetch('/users/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ids: usersId,
        }),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve()
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

const UsersApi = {
    getUsersDataByIds,
    getAllUsersData,
    editUser,
    createUser,
    deleteUsers,
}

export type {
    Api_UsersData,
}

export {
    UsersApi,
}