import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {usersActions} from "./users";
import {UsersApi} from "../../../api/usersApi";
import {UserData} from "./UserData";
import {Toasts} from "../../../common/notification/notifications";

const updateUser = declareAsyncAction<Omit<UserData, 'lastVisit'>>(
    'updateUser',
    (userData, store) => {
        return UsersApi.editUser({
            id: userData.id,
            avatarUrl: userData.avatarUrl,
            email: userData.email,
            firstName: userData.firstName,
            role: userData.role,
            middleName: userData.middleName,
            lastName: userData.lastName,
            phoneNumber: userData.phone,
            birthday: userData.birthDay ? String(userData.birthDay.getTime()) : undefined,
        })
            .then(() => {
                Toasts.success('Пользователь успешно изменен')
                store.dispatch(usersActions.updateUser({
                    ...userData,
                }))
            })
            .catch(() => {
                Toasts.error('При изменении пользователя произошла ошибка')
            })
    }
)

export {
    updateUser,
}