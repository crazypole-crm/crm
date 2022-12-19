import {AuthenticationApi} from "../../api/authenticationApi";
import {Toasts} from "../../common/notification/notifications";
import {declareAsyncAction} from "../../core/reatom/declareAsyncAction";
import {loginAction} from "./login";


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
                store.dispatch(loginAction({
                    login: email,
                    password: password,
                }))
                return Promise.resolve()
            })
            .catch(err => {
                Toasts.error('При регистрации произошла ошибка')
                return Promise.reject()
            })
    }
)

export {
    registrationAction,
}