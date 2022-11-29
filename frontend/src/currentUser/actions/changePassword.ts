import {declareAsyncAction} from "../../core/reatom/declareAsyncAction";
import {CurrentUserApi} from "../../api/currentUserApi";
import {processStandardError} from "../../core/error/processStandardError";

type ChangePasswordPayload = {
    userId: string,
    oldPassword: string,
    newPassword: string,
}

const changePassword = declareAsyncAction<ChangePasswordPayload, Promise<Response>, Promise<Response>>('changePassword',
    ({newPassword, oldPassword, userId}, store) => {
        return CurrentUserApi.changePassword({
            newPassword,
            oldPassword,
            userId,
        })
            .then(response => Promise.resolve(response))
            .catch(response => Promise.reject(response))
    }
)

export {
    changePassword
}