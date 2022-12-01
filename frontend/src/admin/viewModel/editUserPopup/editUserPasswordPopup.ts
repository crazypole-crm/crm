import { combine, declareAction, declareAtom } from "@reatom/core"
import { HttpStatus } from "../../../core/http/HttpStatus"
import { declareAtomWithSetter } from "../../../core/reatom/declareAtomWithSetter"
import { dispatchAsyncAction } from "../../../core/reatom/dispatchAsyncAction"
import { changePassword } from "../../../currentUser/actions/changePassword"
import { authorizedCurrentUser } from "../../../currentUser/currentUser"
import { editUserPopupActions } from "./editUserPopup"

type ModeType = 'create' | 'edit'

type OpenPayload = {
    mode: 'create',
} | {
    mode: 'edit',
    userId: string,
    userFullName: string,
}

const open = declareAction<OpenPayload>('editUserPassword.open')
const close = declareAction('editUser.close')

const [openedAtom, setOpened] = declareAtomWithSetter('editUserPassword.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(changePassword.done, () => false),
])

const popupModeAtom = declareAtom<ModeType>('editUserPassword.popupMode', 'edit', on => [
    on(open, (_, value) => value.mode)
])

const userFullNameAtom = declareAtom<string|null>('editUserPassword.userFullName', null, on => [
    on(open, (_, value) => (value.mode === 'edit' ? value.userFullName : null) || null)
])

const userIdAtom = declareAtom<string|null>('editUserPassword.userId', null, on => [
    on(open, (_, value) => (value.mode === 'edit' ? value.userId : null) || null)
])

const [userOldPasswordAtom, setUserOldPassword] = declareAtomWithSetter<string|null>('editUserPassword.userOldPassword', null)

const [userNewPasswordAtom, setUserNewPassword] = declareAtomWithSetter<string|null>('editUserPassword.userNewPassword', null)

const [userPasswordCheckAtom, setUserPasswordCheck] = declareAtomWithSetter<string|null>('editUserPassword.userPasswordCheck', null)

const [userOldPasswordErrorAtom, setUserOldPasswordError] = declareAtomWithSetter('editUserPassword.userOldPasswordError', '', on => [
    on(setUserOldPassword, () => ''),
])

const [userNewPasswordErrorAtom, setUserNewPasswordError] = declareAtomWithSetter('editUserPassword.userNewPasswordError', '', on => [
    on(setUserNewPassword, () => ''),
])

const [userNewPasswordCheckErrorAtom, setUserPasswordCheckError] = declareAtomWithSetter('editUserPassword.userPasswordCheckError', '', on => [
    on(setUserPasswordCheck, () => ''),
    on(setUserNewPassword, () => '')
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
        const popupMode = store.getState(popupModeAtom)
        const userOldPassword = store.getState(userOldPasswordAtom)
        const userNewPassword = store.getState(userNewPasswordAtom)
        const userPasswordCheck = store.getState(userPasswordCheckAtom)

        const currentUserId = store.getState(authorizedCurrentUser).id

        const userPasswordCheckError = getUserPasswordCheckError(userNewPassword, userPasswordCheck)

        store.dispatch(setUserPasswordCheckError(userPasswordCheckError))

        if (userPasswordCheckError) {
            return
        }

        if (popupMode === 'edit') {
            if (currentUserId === userId) {
                if (userOldPassword && userNewPassword) {
                    dispatchAsyncAction(store, changePassword, {
                        userId,
                        oldPassword: userOldPassword,
                        newPassword: userNewPassword,
                    })
                        .then(response => {
                            if ((response as Response).status === HttpStatus.BAD_REQUEST) {
                                store.dispatch(setUserOldPasswordError('Старый пароль не подходит'))
                            }
                        })
                }
            }
        }
        else {
            store.dispatch(editUserPopupActions.setUserNewPassword(userNewPassword))
        }
    }
)

const editUserPasswordPopupAtom = combine({
    opened: openedAtom,
    popupMode: popupModeAtom,
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