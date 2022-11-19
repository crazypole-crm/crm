import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {UsersApi} from "../../../api/usersApi";
import {usersActions} from "./users";
import {processStandardError} from "../../../core/error/processStandardError";

const deleteUser = declareAsyncAction<string>(
    'user.createUser',
    (userId, store) => {
        return UsersApi.deleteUser(userId)
            .then(() => {
                store.dispatch(usersActions.removeUsers([userId]))
            })
            .catch(processStandardError)
    }
)

export {
    deleteUser,
}
