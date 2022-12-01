import {declareAsyncAction} from "../../core/reatom/declareAsyncAction";
import {CurrentUserApi} from "../../api/currentUserApi";
import {Toasts} from "../../common/notification/notifications";

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
                Toasts.success('Пароль успешно изменен')
                return Promise.resolve(response)
            })
    }
)

export {
    changePassword
}