import {declareAsyncAction} from "../../core/reatom/declareAsyncAction";
import {UserData} from "../../admin/viewModel/users/UserData";
import {CurrentUserApi} from "../../api/currentUserApi";
import {authorizedCurrentUser, currentUserActions} from "../currentUser";
import {usersActions} from "../../admin/viewModel/users/users";
import {Toasts} from "../../common/notification/notifications";

const setCurrentUserInfo = declareAsyncAction<Omit<UserData, 'lastVisit' | 'role'>>('currentUser.setInfo',
    (data, store) => {
        return CurrentUserApi.setUserInfo({
            id: data.id,
            avatarUrl: data.avatarUrl,
            email: data.email,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            phoneNumber: data.phone,
            birthday: data.birthDay ? String(data.birthDay.getTime()) : undefined,
        })
            .then(() => {
                const currentUserData = store.getState(authorizedCurrentUser)
                Toasts.success('Изменение пользователя прошло успешно')
                const newUserData = {
                    ...data,
                    role: currentUserData.role,
                }
                store.dispatch(currentUserActions.setCurrentUserData({
                    isAuthUser: true,
                    ...newUserData,
                }))
                store.dispatch(usersActions.updateUser(newUserData))
            })
            .catch(() => {
                Toasts.error('При изменении данных пользователя произошла ошибка')
            })
    }
)

export {
    setCurrentUserInfo,
}