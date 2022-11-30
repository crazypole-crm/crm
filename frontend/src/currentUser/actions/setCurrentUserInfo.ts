import {declareAsyncAction} from "../../core/reatom/declareAsyncAction";
import {UserData} from "../../admin/viewModel/users/UserData";
import {CurrentUserApi} from "../../api/currentUserApi";
import {currentUserActions} from "../currentUser";
import {usersActions} from "../../admin/viewModel/users/users";
import {Toasts} from "../../common/notification/notifications";

const setCurrentUserInfo = declareAsyncAction<Omit<UserData, 'lastVisit'>>('currentUser.setInfo',
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
                Toasts.success('Изменение пользователя прошло успешно')
                store.dispatch(currentUserActions.setCurrentUserData({
                    isAuthUser: true,
                    ...data,
                }))
                store.dispatch(usersActions.updateUser(data))
            })
            .catch(() => {
                Toasts.error('При изменении данных пользователя произошла ошибка')
            })
    }
)

export {
    setCurrentUserInfo,
}