import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {combine, declareAction, declareAtom} from "@reatom/core";
import {UserData, UserRole} from "../users/UserData";
import {updateUser} from "../users/updateUser";
import {authorizedCurrentUser} from "../../../currentUser/currentUser";
import {setCurrentUserInfo} from "../../../currentUser/actions/setCurrentUserInfo";
import {createUser} from "../users/createUser";
import {verify} from "../../../core/verify";
import {changePassword} from "../../../currentUser/actions/changePassword";
import {dispatchAsyncAction} from "../../../core/reatom/dispatchAsyncAction";
import {HttpStatus} from "../../../core/http/HttpStatus";

type ModeType = 'create' | 'edit'

type OpenPayload = {
    mode: 'create',
} | {
    mode: 'edit',
    userData: UserData,
}

const open = declareAction<OpenPayload>('editUser.open')
const close = declareAction('editUser.close')

const [openedAtom, setOpened] = declareAtomWithSetter('editUser.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(updateUser.done, () => false),
    on(createUser.done, () => false),
])

const popupModeAtom = declareAtom<ModeType>('editUser.popupMode', 'edit', on => [
    on(open, (_, value) => value.mode)
])

const userIdAtom = declareAtom<string|null>('editUser.userId', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.userData.id : null)
])

const [userBirthDayAtom, setUserBirthDay] = declareAtomWithSetter<Date|null>('editUser.userBirthDate', null, on => [
    on(open, (_, value) => (value.mode === 'edit' ? value.userData.birthDay : null) || null)
])

const [userLastNameAtom, setUserLastName] = declareAtomWithSetter<string|null>('editUser.userLasName', null, on => [
    on(open, (_, value) => (value.mode === 'edit' ? value.userData.lastName : null) || null)
])

const [userFirstNameAtom, setUserFirstName] = declareAtomWithSetter<string|null>('editUser.userFirstName', null, on => [
    on(open, (_, value) => (value.mode === 'edit' ? value.userData.firstName : null) || null)
])

const [userMiddleNameAtom, setUserMiddleName] = declareAtomWithSetter<string|null>('editUser.userMiddleName', null, on => [
    on(open, (_, value) => (value.mode === 'edit' ? value.userData.middleName : null) || null)
])

const [userPhoneAtom, setUserPhone] = declareAtomWithSetter<string|null>('editUser.userPhone', null, on => [
    on(open, (_, value) => (value.mode === 'edit' ? value.userData.phone : null) || null)
])

const [userEmailAtom, setUserEmail] = declareAtomWithSetter<string|null>('editUser.userEmail', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.userData.email : null)
])

const [userRoleAtom, setUserRole] = declareAtomWithSetter<UserRole>('editUser.userRole', 'client', on => [
    on(open, (_, value) => value.mode === 'edit' ? value.userData.role : 'client')
])

const [userOldPasswordAtom, setUserOldPassword] = declareAtomWithSetter<string|null>('editUser.userOldPassword', null)

const [userNewPasswordAtom, setUserNewPassword] = declareAtomWithSetter<string|null>('editUser.userNewPassword', null)

const [userPasswordCheckAtom, setUserPasswordCheck] = declareAtomWithSetter<string|null>('editUser.userPasswordCheck', null)

const [userPhoneErrorAtom, setUserPhoneError] = declareAtomWithSetter('editUser.userPhoneError', '', on => [
    on(setUserPhone, () => '')
])

const [userEmailErrorAtom, setUserEmailError] = declareAtomWithSetter('editUser.userEmptyEmailError', '', on => [
    on(setUserEmail, () => '')
])

const [userOldPasswordErrorAtom, setUserOldPasswordError] = declareAtomWithSetter('editUser.userOldPasswordError', '', on => [
    on(setUserOldPassword, () => ''),
])

const [userNewPasswordErrorAtom, setUserNewPasswordError] = declareAtomWithSetter('editUser.userNewPasswordError', '', on => [
    on(setUserNewPassword, () => ''),
])

const [userNewPasswordCheckErrorAtom, setUserPasswordCheckError] = declareAtomWithSetter('editUser.userPasswordCheckError', '', on => [
    on(setUserPasswordCheck, () => ''),
    on(setUserNewPassword, () => '')
])

function getUserPhoneError(phone: string | null) {
    if (phone && !RegExp(/^\d{11}$/).test(phone)) {
        return 'Некорректный телефон'
    }
    return ''
}

function getEmailError(email: string | null) {
    if (!email) {
        return 'Поле email обязательное!'
    }
    if (!RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
        return 'Некорректный email'
    }
    return ''
}

function getUserPasswordCheckError(password: string | null, conformPassword: string | null) {
    if (password !== conformPassword) {
        return 'Пароли должный совпадать'
    }
    return ''
}

const submit = declareAction('editUser.submit',
    (_, store) => {
        const userId = store.getState(userIdAtom)
        const popupMode = store.getState(popupModeAtom)
        const userLastName = store.getState(userLastNameAtom)
        const userFirstName = store.getState(userFirstNameAtom)
        const userMiddleName = store.getState(userMiddleNameAtom)
        const userPhone = store.getState(userPhoneAtom)
        const userEmail = store.getState(userEmailAtom)
        const userRole = store.getState(userRoleAtom)
        const userOldPassword = store.getState(userOldPasswordAtom)
        const userNewPassword = store.getState(userNewPasswordAtom)
        const userPasswordCheck = store.getState(userPasswordCheckAtom)
        const userBirthDay = store.getState(userBirthDayAtom)

        const currentUserId = store.getState(authorizedCurrentUser).id

        const userPhoneError = getUserPhoneError(userPhone)
        const userEmailError = getEmailError(userEmail)
        const userPasswordCheckError = getUserPasswordCheckError(userNewPassword, userPasswordCheck)

        store.dispatch(setUserPhoneError(userPhoneError))
        store.dispatch(setUserEmailError(userEmailError))
        store.dispatch(setUserPasswordCheckError(userPasswordCheckError))

        if (userPhoneError || userEmailError || userPasswordCheckError) {
            return
        }

        if (popupMode === 'edit') {
            if (currentUserId === userId) {
                store.dispatch(setCurrentUserInfo({
                    id: userId,
                    firstName: userFirstName || undefined,
                    middleName: userMiddleName || undefined,
                    lastName: userLastName || undefined,
                    phone: userPhone || undefined,
                    email: verify(userEmail),
                    birthDay: userBirthDay || undefined,
                }))
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
            else {
                store.dispatch(updateUser({
                    id: verify(userId),
                    email: verify(userEmail),
                    role: userRole,
                    phone: userPhone || undefined,
                    firstName: userFirstName || undefined,
                    lastName: userLastName || undefined,
                    middleName: userMiddleName || undefined,
                    birthDay: userBirthDay || undefined,
                }))
            }
        }
        else {
            store.dispatch(createUser({
                email: verify(userEmail),
                role: userRole,
                phone: userPhone || undefined,
                firstName: userFirstName || undefined,
                lastName: userLastName || undefined,
                middleName: userMiddleName || undefined,
                birthDay: userBirthDay || undefined,
                password: verify(userOldPassword),
            }))
        }
    }
)

const editUserPopupAtom = combine({
    opened: openedAtom,
    popupMode: popupModeAtom,
    userId: userIdAtom,
    userLastName: userLastNameAtom,
    userFirstName: userFirstNameAtom,
    userMiddleName: userMiddleNameAtom,
    userPhone: userPhoneAtom,
    userEmail: userEmailAtom,
    userRole: userRoleAtom,
    userOldPassword: userOldPasswordAtom,
    userNewPassword: userNewPasswordAtom,
    userPasswordCheck: userPasswordCheckAtom,
    userBirthDay: userBirthDayAtom,
    userPhoneError: userPhoneErrorAtom,
    userEmailError: userEmailErrorAtom,
    userPasswordCheckError: userNewPasswordCheckErrorAtom,
    userOldPasswordError: userOldPasswordErrorAtom,
    userNewPasswordError: userNewPasswordErrorAtom,
})

const editUserPopupActions = {
    setOpened,
    open,
    close,
    setUserLastName,
    setUserFirstName,
    setUserMiddleName,
    setUserBirthDay,
    setUserPhone,
    setUserEmail,
    setUserRole,
    setUserOldPassword,
    setUserNewPassword,
    setUserPasswordCheck,
    setUserPhoneError,
    setUserEmailError,
    setUserPasswordCheckError,
    setUserOldPasswordError,
    setUserNewPasswordError,
    submit,
}

export {
    editUserPopupAtom,
    editUserPopupActions,
}