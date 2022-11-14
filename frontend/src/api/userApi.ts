import { UserRole } from "../admin/viewModel/users/UserData"

type Api_UserData = {
    id: string,
    email: string,
    password: string,
    avatarUrl: string,
    role: UserRole,
    phone?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    birthDay?: Date,
    lastVisit?: Date,
}

function editUser(userData: Api_UserData): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

const UserApi = {
    editUser,
}

export type {
    Api_UserData,
}

export {
    UserApi,
}