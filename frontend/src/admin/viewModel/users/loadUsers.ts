import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {UserData} from "./UserData";
import {usersActions, usersAtom} from "./users";
import {Store} from "@reatom/core";
import {dispatchAsyncAction} from "../../../core/reatom/dispatchAsyncAction";
import {Api_UsersData, UsersApi} from "../../../api/usersApi";
import {Toasts} from "../../../common/notification/notifications";
import {remapApiRolToModelRole} from "../../../common/role/remapApiRolToModelRole";

function handleUsersData(store: Store, users: Array<Api_UsersData>, updateFn: (users: UserData[]) => void) {
    const remappedUsers = users.map(user => ({
        ...user,
        birthDay: user.birthday ? new Date(Number(user.birthday)) : undefined,
        lastVisit: user.lastVisit ? new Date(Number(user.lastVisit)) : undefined,
        role: remapApiRolToModelRole(user.role)
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

const loadUsersImpl = declareAsyncAction<() => Promise<Array<Api_UsersData>>, Array<UserData>>('loadUsersImpl',
    (loadFn, store) => {
        return loadFn()
            .then(usersData => {
                handleUsersData(store, usersData, users => store.dispatch(usersActions.setNewUsers(users)))
                return Promise.resolve(usersData)
            })
            .catch(() => {
                Toasts.error('При загрузке пользователей произошла ошибка')
                return Promise.reject()
            })
    }
)

const loadAllUsersData = declareAsyncAction<void, Array<UserData>>('loadAllUsers',
    (_, store) => {
        return dispatchAsyncAction(store, loadUsersImpl, UsersApi.getAllUsersData)
    }
)

const loadAllTrainers = declareAsyncAction<void, Array<UserData>>('loadAllTrainers',
    (_, store) => {
        return dispatchAsyncAction(store, loadUsersImpl, UsersApi.getAllTrainers)
    }
)

const [usersLoadingAtom] = declareAtomWithSetter('usersLoading', false, on => [
    on(loadUsers, () => true),
    on(loadUsers.done, () => false),
    on(loadUsers.fail, () => false),
    on(loadAllTrainers, () => true),
    on(loadAllTrainers.done, () => false),
    on(loadAllTrainers.fail, () => false),
    on(loadAllUsersData, () => true),
    on(loadAllUsersData.done, () => false),
    on(loadAllUsersData.fail, () => false),
])

export {
    loadUsers,
    usersLoadingAtom,
    loadAbsentUsers,
    loadAllUsersData,
    loadAllTrainers,
}