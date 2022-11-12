import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {processStandardError} from "../../../core/error/processStandardError";
import {UserData, UserRole} from "./UserData";
import {usersActions, usersAtom} from "./users";
import {Store} from "@reatom/core";
import {dispatchAsyncAction} from "../../../core/reatom/dispatchAsyncAction";
import {Api_UsersData, UsersApi} from "../../../api/usersApi";
import {generateUuid} from "../../../core/uuid/generateUuid";

function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function getRandomRole(): UserRole {
    const roles: UserRole[] = ['admin', 'client']
    const randomIndex = randomInteger(0, 1)
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

function handleUsersData(store: Store, users: Array<Api_UsersData>, updateFn: (users: UserData[]) => void) {
    users.push(getRandomUserData('trainer1', 'trainer'))
    users.push(getRandomUserData('trainer2', 'trainer'))
    users.push(getRandomUserData('trainer3', 'trainer'))
    users.push(getRandomUserData('client1', 'client'))
    const remappedUsers = users.map(user => ({
        ...user,
        birthDay: user.birthDay ? new Date(user.birthDay) : undefined,
        lastVisit: user.lastVisit ? new Date(user.lastVisit) : undefined,
        role: user.role || getRandomRole()
    }))
    updateFn(remappedUsers)
}

function loadUsersResponseCall(store: Store, userIds: Array<string>) {
    return UsersApi.getUsersDataByIds(userIds)
        .then(usersData => {
            handleUsersData(store, usersData, users => store.dispatch(usersActions.updateUsers(users)))
            return Promise.resolve(usersData)
        })
        .catch(() => {
            processStandardError()
            return Promise.reject()
        })
}

const loadUsers = declareAsyncAction<Array<string>, Array<UserData>>('loadUsers',
    (userIds, store) => {
        return loadUsersResponseCall(store, userIds)
    }
)

const loadAbsentUsers = declareAsyncAction<Array<string>, Array<UserData>>('loadAbsentUsers',
    (userIds, store) => {
        const users = store.getState(usersAtom)
        const absentUserId = userIds.filter(userId => !users[userId])
        if (absentUserId.length > 0) {
            return dispatchAsyncAction(store, loadUsers, absentUserId)
        }
        return Promise.resolve([])
    }
)

const loadAllUsersData = declareAsyncAction<void, Array<UserData>>('loadAllUsers',
    (_, store) => {
        return UsersApi.getAllUsersData()
            .then(usersData => {
                handleUsersData(store, usersData, users => store.dispatch(usersActions.setNewUsers(users)))
                return Promise.resolve(usersData)
            })
            .catch(() => {
                processStandardError()
                return Promise.reject()
            })
    }
)

const [usersLoadingAtom] = declareAtomWithSetter('usersLoading', false, on => [
    on(loadUsers, () => true),
    on(loadUsers.done, () => false),
    on(loadUsers.fail, () => false),
    on(loadAllUsersData, () => true),
    on(loadAllUsersData.done, () => false),
    on(loadAllUsersData.fail, () => false),
])

export {
    loadUsers,
    usersLoadingAtom,
    loadAbsentUsers,
    loadAllUsersData,
}