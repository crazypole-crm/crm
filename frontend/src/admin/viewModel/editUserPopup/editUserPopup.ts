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
    on(setCurrentUserInfo.done, () => false),
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

const [userPasswordAtom, setUserPassword] = declareAtomWithSetter<string|null>('editUser.userPassword', null)

const [userPasswordCheckAtom, setUserPasswordCheck] = declareAtomWithSetter<string|null>('editUser.userPasswordCheck', null)

const [userLastNameErrorAtom, setUserLastNameError] = declareAtomWithSetter('editUser.userLastNameError', false, on => [
    on(setUserLastName, () => false)
])

const [userFirstNameErrorAtom, setUserFirstNameError] = declareAtomWithSetter('editUser.userFirstNameError', false, on => [
    on(setUserFirstName, () => false)
])

const [userPhoneErrorAtom, setUserPhoneError] = declareAtomWithSetter('editUser.userPhoneError', false, on => [
    on(setUserPhone, () => false)
])

const [userEmptyEmailErrorAtom, setUserEmptyEmailError] = declareAtomWithSetter('editUser.userEmptyEmailError', false, on => [
    on(setUserEmail, () => false)
])

const [userIncorrectEmailErrorAtom, setUserIncorrectEmailError] = declareAtomWithSetter('editUser.userIncorrectEmailError', false, on => [
    on(setUserEmail, () => false)
])

const [userPasswordCheckErrorAtom, setUserPasswordCheckError] = declareAtomWithSetter('editUser.userPasswordCheckError', false, on => [
    on(setUserPasswordCheck, () => false),
    on(setUserPassword, () => false)
])

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
        const userPassword = store.getState(userPasswordAtom)
        const userPasswordCheck = store.getState(userPasswordCheckAtom)
        const userBirthDay = store.getState(userBirthDayAtom)

        const currentUserId = store.getState(authorizedCurrentUser).id

        const userLastNameError = !userLastName
        const userFirstNameError = !userFirstName
        const userPhoneError = userPhone ? !RegExp(/^\d{11}$/).test(userPhone) : false
        const userEmptyEmailError = !userEmail
        const userIncorrectEmailError = userEmptyEmailError ? false : !RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(userEmail)
        const userPasswordCheckError = (userPassword !== userPasswordCheck)

        store.dispatch(setUserLastNameError(userLastNameError))
        store.dispatch(setUserFirstNameError(userFirstNameError))
        store.dispatch(setUserPhoneError(userPhoneError))
        store.dispatch(setUserEmptyEmailError(userEmptyEmailError))
        store.dispatch(setUserIncorrectEmailError(userIncorrectEmailError))
        store.dispatch(setUserPasswordCheckError(userPasswordCheckError))

        if (userLastNameError || userFirstNameError || userPhoneError || userEmptyEmailError || userIncorrectEmailError || userPasswordCheckError) {
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
                    role: userRole,
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
            store.dispatch(createUser({
                email: userEmail,
                role: userRole,
                phone: userPhone || undefined,
                firstName: userFirstName || undefined,
                lastName: userLastName || undefined,
                middleName: userMiddleName || undefined,
                birthDay: userBirthDay || undefined,
                password: verify(userPassword),
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
    userPassword: userPasswordAtom,
    userPasswordCheck: userPasswordCheckAtom,
    userBirthDay: userBirthDayAtom,
    userLastNameError: userLastNameErrorAtom,
    userFirstNameError: userFirstNameErrorAtom,
    userPhoneError: userPhoneErrorAtom,
    userEmptyEmailError: userEmptyEmailErrorAtom,
    userIncorrectEmailError: userIncorrectEmailErrorAtom,
    userPasswordCheckError: userPasswordCheckErrorAtom
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
    setUserPassword,
    setUserPasswordCheck,
    setUserLastNameError,
    setUserFirstNameError,
    setUserPhoneError,
    setUserEmptyEmailError,
    setUserIncorrectEmailError,
    setUserPasswordCheckError,
    submit,
}

export {
    editUserPopupAtom,
    editUserPopupActions,
}