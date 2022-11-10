import {HttpStatus} from "../core/http/HttpStatus";
import {GetUserDataType} from "./currentUserApi";
import {UserRole} from "../admin/viewModel/users/UserData";
import {generateUuid} from "../core/uuid/generateUuid";

type Api_UsersData = {
    id: string,
    email: string,
    avatarUrl: string,
    role: UserRole,
    phone?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    birthDay?: number,
    lastVisit?: number,
}

function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function getRandomRole(): UserRole {
    const roles: UserRole[] = ['admin', 'trainer', 'client']
    const randomIndex = randomInteger(0, 2)
    return roles[randomIndex]
}

function randomPhone(): string|undefined {
    const show = randomInteger(0, 1)
    return show ? '89021025370' : undefined
}

function getRandomUserData(id?: string, role?: UserRole): Api_UsersData {
    return {
        id: id || generateUuid(),
        avatarUrl: '',
        birthDay: Math.round(Math.random() * 10000000000000),
        lastVisit: Math.round(Math.random() * 10000000000000),
        firstName: 'Edward',
        lastName: 'King',
        middleName: `${randomInteger(0, 100)}`,
        role: role || getRandomRole(),
        email: `EdwardKing${randomInteger(0, 100)}`,
        phone: randomPhone(),
    }
}

function getUsersDataByIds(userIds: Array<string>): Promise<Array<Api_UsersData>> {
    return new Promise(resolve => {
        setTimeout(() => {
            const users = []
            for (let i = 0; i < 100; i++) {
                users.push(getRandomUserData())
            }
            users.push(getRandomUserData('1', 'trainer'))
            resolve(users)
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
    return new Promise(resolve => {
        setTimeout(() => {
            const users = []
            for (let i = 0; i < 100; i++) {
                users.push(getRandomUserData())
            }
            users.push(getRandomUserData('1', 'trainer'))
            resolve(users)
        }, 1000)
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