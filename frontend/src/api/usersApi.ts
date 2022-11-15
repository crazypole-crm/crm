import {HttpStatus} from "../core/http/HttpStatus";
import {UserRole} from "../admin/viewModel/users/UserData";

type Api_UsersData = {
    id: string,
    email: string,
    avatarUrl?: string,
    phone?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    role: UserRole,
    birthDay?: number,
    lastVisit?: number,
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
    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         const users = []
    //         for (let i = 0; i < 100; i++) {
    //             users.push(getRandomUserData())
    //         }
    //         users.push(getRandomUserData('trainer1', 'trainer'))
    //         users.push(getRandomUserData('trainer2', 'trainer'))
    //         users.push(getRandomUserData('trainer3', 'trainer'))
    //         resolve(users)
    //     }, 1000)
    // })

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


const UsersApi = {
    getUsersDataByIds,
    getAllUsersData,
}

export type {
    Api_UsersData,
}

export {
    UsersApi,
}