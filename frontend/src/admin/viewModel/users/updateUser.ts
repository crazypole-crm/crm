import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {processStandardError} from "../../../core/error/processStandardError";
import {usersActions} from "./users";
import {UsersApi} from "../../../api/usersApi";
import {UserData} from "./UserData";

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
            birthday: userData.birthDay?.getTime(),
        })
            .then(() => {
                store.dispatch(usersActions.updateUser({
                    ...userData,
                }))
            })
            .catch(processStandardError)
    }
)

export {
    updateUser,
}