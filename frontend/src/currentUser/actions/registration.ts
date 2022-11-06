import { AuthenticationApi } from "../../api/authenticationApi";
import { Toasts } from "../../common/notification/notifications";
import { processStandardError } from "../../core/error/processStandardError";
import { declareAsyncAction } from "../../core/reatom/declareAsyncAction";


type RegistrationActionPayload = {
    email: string;
    password: string;
};

const registrationAction = declareAsyncAction<RegistrationActionPayload>(
    'currentUser.registrationAction',
    async ({email, password}, store) => {
        return AuthenticationApi.registration(email, password)
            .then((resp) => {
                Toasts.success('Регистрация прошла успешно')
                setTimeout(() => window.location.reload(), 1000)
                return Promise.resolve()
            })
            .catch(err => {
                processStandardError()
                return Promise.reject()
            })
    }
)

export {
    registrationAction,
}