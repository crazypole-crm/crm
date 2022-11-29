import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {UsersApi} from "../../../api/usersApi";
import {usersActions, usersAtom} from "./users";
import {authorizedCurrentUser} from "../../../currentUser/currentUser";
import {Toasts} from "../../../common/notification/notifications";

const deleteUser = declareAsyncAction<Array<string>>(
    'user.createUser',
    (userIds, store) => {
        const currentUserId = store.getState(authorizedCurrentUser).id
        const users = store.getState(usersAtom)

        const removedUsersIds = userIds.filter(userId => userId !== currentUserId)
        const removedUsers = removedUsersIds.map(id => users[id])

        store.dispatch(usersActions.removeUsers(removedUsersIds))
        return UsersApi.deleteUsers(removedUsersIds)
            .then(() => {
                Toasts.success('Пользователи успешно удалены')
            })
            .catch(() => {
                Toasts.error('При удалении пользователей произошла ошибка')
                store.dispatch(usersActions.updateUsers(removedUsers))
            })
    }
)

export {
    deleteUser,
}
