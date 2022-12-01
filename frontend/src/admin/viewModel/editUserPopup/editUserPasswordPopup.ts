import { combine, declareAction, declareAtom } from "@reatom/core"
import { HttpStatus } from "../../../core/http/HttpStatus"
import { declareAtomWithSetter } from "../../../core/reatom/declareAtomWithSetter"
import { dispatchAsyncAction } from "../../../core/reatom/dispatchAsyncAction"
import { changePassword } from "../../../currentUser/actions/changePassword"
import { authorizedCurrentUser } from "../../../currentUser/currentUser"
import {Toasts} from "../../../common/notification/notifications";

type OpenPayload = {
    userId: string,
    userFullName: string,
}

const open = declareAction<OpenPayload>('editUserPassword.open')
const close = declareAction('editUser.close')

const [openedAtom, setOpened] = declareAtomWithSetter('editUserPassword.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const userFullNameAtom = declareAtom<string|null>('editUserPassword.userFullName', null, on => [
    on(open, (_, value) => value.userFullName || null)
])

const userIdAtom = declareAtom<string|null>('editUserPassword.userId', null, on => [
    on(open, (_, value) => value.userId || null)
])

const [userOldPasswordAtom, setUserOldPassword] = declareAtomWithSetter<string|null>('editUserPassword.userOldPassword', null, on => [
    on(open, () => '')
])

const [userNewPasswordAtom, setUserNewPassword] = declareAtomWithSetter<string|null>('editUserPassword.userNewPassword', null, on => [
    on(open, () => '')
])

const [userPasswordCheckAtom, setUserPasswordCheck] = declareAtomWithSetter<string|null>('editUserPassword.userPasswordCheck', null, on => [
    on(open, () => '')
])

const [userOldPasswordErrorAtom, setUserOldPasswordError] = declareAtomWithSetter('editUserPassword.userOldPasswordError', '', on => [
    on(setUserOldPassword, () => ''),
    on(open, () => '')
])

const [userNewPasswordErrorAtom, setUserNewPasswordError] = declareAtomWithSetter('editUserPassword.userNewPasswordError', '', on => [
    on(setUserNewPassword, () => ''),
    on(open, () => '')
])

const [userNewPasswordCheckErrorAtom, setUserPasswordCheckError] = declareAtomWithSetter('editUserPassword.userPasswordCheckError', '', on => [
    on(setUserPasswordCheck, () => ''),
    on(setUserNewPassword, () => ''),
    on(open, () => '')
])

function getUserPasswordCheckError(password: string | null, conformPassword: string | null) {
    if (password !== conformPassword) {
        return 'Пароли должный совпадать'
    }
    return ''
}

const submit = declareAction('editUserPassword.submit',
    (_, store) => {
        const userId = store.getState(userIdAtom)
        const userOldPassword = store.getState(userOldPasswordAtom)
        const userNewPassword = store.getState(userNewPasswordAtom)
        const userPasswordCheck = store.getState(userPasswordCheckAtom)

        const currentUserId = store.getState(authorizedCurrentUser).id

        const userPasswordCheckError = getUserPasswordCheckError(userNewPassword, userPasswordCheck)

        store.dispatch(setUserPasswordCheckError(userPasswordCheckError))

        if (userPasswordCheckError) {
            return
        }

        if (currentUserId === userId && userOldPassword && userNewPassword) {
            dispatchAsyncAction(store, changePassword, {
                userId,
                oldPassword: userOldPassword,
                newPassword: userNewPassword,
            })
                .then(response => {
                    if ((response as Response).status === HttpStatus.BAD_REQUEST) {
                        store.dispatch(setUserOldPasswordError('Старый пароль не подходит'))
                        return
                    }
                    Toasts.success('Пароль успешно изменен')
                    store.dispatch(close())
                })
                .catch(() => {
                    Toasts.error('При изменении пароля произошла ошибка')
                    store.dispatch(close())
                })
        }
    }
)

const editUserPasswordPopupAtom = combine({
    opened: openedAtom,
    userId: userIdAtom,
    userFullName: userFullNameAtom,
    userOldPassword: userOldPasswordAtom,
    userNewPassword: userNewPasswordAtom,
    userPasswordCheck: userPasswordCheckAtom,
    userOldPasswordError: userOldPasswordErrorAtom,
    userNewPasswordError: userNewPasswordErrorAtom,
    userNewPasswordCheckError: userNewPasswordCheckErrorAtom
})

const editUserPasswordPopupActions = {
    setOpened,
    open,
    close,
    setUserOldPassword,
    setUserNewPassword,
    setUserPasswordCheck,
    setUserOldPasswordError,
    setUserNewPasswordError,
    setUserPasswordCheckError,
    submit,
}

export {
    editUserPasswordPopupAtom,
    editUserPasswordPopupActions,
}