import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {processStandardError} from "../../../core/error/processStandardError";
import { UserData } from "./UserData";
import { Api_UserData, UserApi } from "../../../api/userApi";
import { usersActions } from "./users";

type UpdateUserPayload = {
    userData: Api_UserData,
}

const updateUser = declareAsyncAction<UpdateUserPayload>(
    'updateUser',
    ({userData}, store) => {
        return UserApi.editUser(userData)
            .then(() => {
                console.log('updateUser: ', userData)
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