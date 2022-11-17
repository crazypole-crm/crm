import {UserData} from "./UserData";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {UsersApi} from "../../../api/usersApi";
import {usersActions} from "./users";
import {processStandardError} from "../../../core/error/processStandardError";


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
            birthday: String(userData.birthDay?.getTime()),
            password: userData.password,
        })
            .then(({id}) => {
                store.dispatch(usersActions.updateUser({
                    ...userData,
                    id,
                }))
            })
            .catch(processStandardError)
    }
)

export {
    createUser,
}
