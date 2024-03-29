import {declareAsyncAction} from "../../core/reatom/declareAsyncAction";
import {CurrentUserApi} from "../../api/currentUserApi";

type ChangePasswordPayload = {
    userId: string,
    oldPassword: string,
    newPassword: string,
}

const changePassword = declareAsyncAction<ChangePasswordPayload, Promise<Response>>('changePassword',
    ({newPassword, oldPassword, userId}, store) => {
        return CurrentUserApi.changePassword({
            newPassword,
            oldPassword,
            userId,
        })
            .then(response => {
                return Promise.resolve(response)
            })
    }
)

export {
    changePassword
}