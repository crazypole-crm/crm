import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {combine, declareAction, declareAtom} from "@reatom/core";
import {UserData, UserRole} from "../users/UserData";
import {updateUser} from "../users/updateUser";
import {authorizedCurrentUser} from "../../../currentUser/currentUser";
import {setCurrentUserInfo} from "../../../currentUser/actions/setCurrentUserInfo";
import {createUser} from "../users/createUser";
import {verify} from "../../../core/verify";

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

const [userPhoneErrorAtom, setUserPhoneError] = declareAtomWithSetter('editUser.userPhoneError', '', on => [
    on(setUserPhone, () => '')
])

const [userEmailErrorAtom, setUserEmailError] = declareAtomWithSetter('editUser.userEmptyEmailError', '', on => [
    on(setUserEmail, () => '')
])

const [userNewPasswordAtom, setUserNewPassword] = declareAtomWithSetter<string>('editUser.userNewPassword', '')

const [userPasswordCheckAtom, setUserPasswordCheck] = declareAtomWithSetter<string>('editUser.userPasswordCheck', '')

const [userNewPasswordErrorAtom, setUserNewPasswordError] = declareAtomWithSetter('editUser.userNewPasswordError', '', on => [
    on(setUserNewPassword, () => ''),
])

const [userNewPasswordCheckErrorAtom, setNewPasswordCheckError] = declareAtomWithSetter('editUser.userOldPasswordCheckError', '', on => [
    on(setUserPasswordCheck, () => ''),
    on(setUserNewPassword, () => '')
])

function getUserPasswordCheckError(password: string, conformPassword: string) {
    if (password !== conformPassword) {
        return 'Пароли должный совпадать'
    }
    return ''
}

function getUserNewPasswordCheckError(password: string) {
    if (!password) {
        return 'Поле новый пароль обязательное'
    }
    return ''
}

function getUserPhoneError(phone: string | null) {
    if (phone && !RegExp(/^(\+7|8)\d{10}$/).test(phone)) {
        return 'Некорректный телефон'
    }
    return ''
}

function getEmailError(email: string | null) {
    if (!email) {
        return 'Поле email обязательное!'
    }
    if (!RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
        return 'Некорректный email'
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
        const userBirthDay = store.getState(userBirthDayAtom)
        const userNewPassword = store.getState(userNewPasswordAtom)
        const userPasswordCheck = store.getState(userPasswordCheckAtom)

        const currentUserId = store.getState(authorizedCurrentUser).id

        const userPhoneError = getUserPhoneError(userPhone)
        const userEmailError = getEmailError(userEmail)

        store.dispatch(setUserPhoneError(userPhoneError))
        store.dispatch(setUserEmailError(userEmailError))

        if (userPhoneError || userEmailError || !userEmail) {
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
                    email: userEmail,
                    birthDay: userBirthDay || undefined,
                }))
            }
            else {
                store.dispatch(updateUser({
                    id: verify(userId),
                    email: userEmail,
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
            const userNewPasswordCheckError = getUserNewPasswordCheckError(userNewPassword)
            const userPasswordCheckError = getUserPasswordCheckError(userNewPassword, userPasswordCheck)

            store.dispatch(setUserNewPasswordError(userNewPasswordCheckError))
            store.dispatch(setNewPasswordCheckError(userPasswordCheckError))

            if (userNewPasswordCheckError || userPasswordCheckError) {
                return
            }

            store.dispatch(createUser({
                email: userEmail,
                role: userRole,
                phone: userPhone || undefined,
                firstName: userFirstName || undefined,
                lastName: userLastName || undefined,
                middleName: userMiddleName || undefined,
                birthDay: userBirthDay || undefined,
                password: userNewPassword,
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
    userNewPassword: userNewPasswordAtom,
    userPasswordCheck: userPasswordCheckAtom,
    userBirthDay: userBirthDayAtom,
    userPhoneError: userPhoneErrorAtom,
    userEmailError: userEmailErrorAtom,
    userNewPasswordError: userNewPasswordErrorAtom,
    userNewPasswordCheckError: userNewPasswordCheckErrorAtom,
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
    setUserPhoneError,
    setUserEmailError,
    submit,
    setUserNewPassword,
    setUserPasswordCheck,
}

export {
    editUserPopupAtom,
    editUserPopupActions,
}