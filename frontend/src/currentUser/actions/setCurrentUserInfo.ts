import {declareAsyncAction} from "../../core/reatom/declareAsyncAction";
import {UserData} from "../../admin/viewModel/users/UserData";
import {CurrentUserApi} from "../../api/currentUserApi";
import {currentUserActions} from "../currentUser";
import {processStandardError} from "../../core/error/processStandardError";
import {usersActions} from "../../admin/viewModel/users/users";

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
                store.dispatch(currentUserActions.setCurrentUserData({
                    isAuthUser: true,
                    ...data,
                }))
                store.dispatch(usersActions.updateUser(data))
            })
            .catch(processStandardError)
    }
)

export {
    setCurrentUserInfo,
}