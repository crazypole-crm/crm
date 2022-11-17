import {HttpStatus} from "../core/http/HttpStatus"
import {goToAuth} from "../core/link/goToUrl";

type Api_UserInfo = {
    id: string,
    email: string,
    avatarUrl?: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    phoneNumber?: string,
    birthday?: string,
}

function setUserInfo(userInfo: Api_UserInfo): Promise<Response> {
    return fetch('/update/current_user_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                case HttpStatus.UNAUTHORIZED:
                    // goToUrl('/auth')
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type ChangePasswordBody = {
    userId: string,
    oldPassword: string,
    newPassword: string,
}

function changePassword(body: ChangePasswordBody): Promise<Response> {
    return fetch('/update/password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                case HttpStatus.BAD_REQUEST:
                    return Promise.resolve(response)
                case HttpStatus.UNAUTHORIZED:
                    goToAuth()
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type GetUserDataType = {
    id: string,
    email: string,
    avatarUrl: string,
    phone: string,
    firstName: string,
    lastName: string,
    middleName: string,
    birthDay: string | null,
    lastVisit: string | null,
};

function getUserData(): Promise<GetUserDataType> {
    return fetch('/current/user_data', {
        method: 'POST',
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return response.json()
                case HttpStatus.UNAUTHORIZED:
                    // goToUrl('/auth')
                    return Promise.reject(response)
                default:
                    return Promise.reject(response.status)
            }
        })
}


const CurrentUserApi = {
    getUserData,
    changePassword,
    setUserInfo,
}

export {
    CurrentUserApi,
}
export type {
    Api_UserInfo,
    ChangePasswordBody,
    GetUserDataType,
}