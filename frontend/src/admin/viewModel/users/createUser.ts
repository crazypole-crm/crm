import {UserData} from "./UserData";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {UsersApi} from "../../../api/usersApi";
import {usersActions} from "./users";
import {Toasts} from "../../../common/notification/notifications";


const createUser = declareAsyncAction<Omit<UserData, 'id' | 'lastVisit'> & {password: string}>(
    'user.createUser',
    (userData, store) => {
        return UsersApi.createUser({
            avatarUrl: userData.avatarUrl,
            email: userData.email,
            firstName: userData.firstName,
            role: userData.role,
            middleName: userData.middleName,
            lastName: userData.lastName,
            phoneNumber: userData.phone,
            birthday: userData.birthDay ? String(userData.birthDay?.getTime()) : undefined,
            password: userData.password,
        })
            .then(({id}) => {
                Toasts.success('Пользователь успешно создан')
                store.dispatch(usersActions.updateUser({
                    ...userData,
                    id,
                }))
            })
            .catch(() => Toasts.error('При создании пользователя произошла ошибка'))
    }
)

export {
    createUser,
}
