import { resolve } from "path";
import { AuthenticationApi } from "../../api/authenticationApi";
import { Toasts } from "../../common/notification/notifications";
import { HttpStatus } from "../../core/http/HttpStatus";
import { declareAsyncAction } from "../../core/reatom/declareAsyncAction";


type LoginActionPayload = {
    login: string;
    password: string;
};

const loginAction = declareAsyncAction<LoginActionPayload>(
    'currentUser.loginAction',
    async ({login, password}, store) => {
        return AuthenticationApi.logIn(login, password)
            .then(resp => {
                Toasts.success('Вход произведен успешно')
                setTimeout(() => window.location.reload(), 1000)
                return Promise.resolve()
            })
            .catch(err => {
                if (err.status && err.status === HttpStatus.UNAUTHORIZED) {
                    Toasts.error('Введен неверный логин или пароль')
                }
                return Promise.reject(err)
            })
    }
)

export {
    loginAction,
}
export type {
    LoginActionPayload
}