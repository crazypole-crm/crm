import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {combine, declareAction, declareAtom} from "@reatom/core";
import {UserData, UserRole} from "../users/UserData";
import { updateUser } from "../users/updateUser";

const open = declareAction<UserData>('editUser.open')
const close = declareAction('editUser.close')

const [openedAtom, setOpened] = declareAtomWithSetter('editUser.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const userIdAtom = declareAtom<string|null>('editUser.userId', null, on => [
    on(open, (_, value) => value.id)
])

const [userBirthDayAtom, setUserBirthDay] = declareAtomWithSetter<Date|null>('editUser.userBirthDate', null, on => [
    on(open, (_, value) => value.birthDay || new Date)
])

const userLastVisitAtom = declareAtom<Date|null>('editUser.userLastVisit', null, on => [
    on(open, (_, value) => value.lastVisit || new Date)
])

const [userLastNameAtom, setUserLastName] = declareAtomWithSetter<string|null>('editUser.userLasName', null, on => [
    on(open, (_, value) => value.lastName || '')
])

const [userFirstNameAtom, setUserFirstName] = declareAtomWithSetter<string|null>('editUser.userFirstName', null, on => [
    on(open, (_, value) => value.firstName || '')
])

const [userMiddleNameAtom, setUserMiddleName] = declareAtomWithSetter<string|null>('editUser.userMiddleName', null, on => [
    on(open, (_, value) => value.middleName || '')
])

const [userPhoneAtom, setUserPhone] = declareAtomWithSetter<string|null>('editUser.userPhone', null, on => [
    on(open, (_, value) => value.phone  || '')
])

const [userEmailAtom, setUserEmail] = declareAtomWithSetter<string|null>('editUser.userEmail', null, on => [
    on(open, (_, value) => value.email || '')
])

const [userRoleAtom, setUserRole] = declareAtomWithSetter<UserRole>('editUser.userRole', 'client', on => [
    on(open, (_, value) => value.role)
])

const [userPasswordAtom, setUserPassword] = declareAtomWithSetter<string|null>('editUser.userPassword', null, on => [
    on(open, (_, value) => _)
])

const [userPasswordCheckAtom, setUserPasswordCheck] = declareAtomWithSetter<string|null>('editUser.userPasswordCheck', null, on => [
    on(open, (_, value) => _)
])

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
        const userLastName = store.getState(userLastNameAtom)
        const userFirstName = store.getState(userFirstNameAtom)
        const userMiddleName = store.getState(userMiddleNameAtom)
        const userPhone = store.getState(userPhoneAtom)
        const userEmail = store.getState(userEmailAtom)
        const userRole = store.getState(userRoleAtom)
        const userPassword = store.getState(userPasswordAtom)
        const userPasswordCheck = store.getState(userPasswordCheckAtom)
        const userBirthDay = store.getState(userBirthDayAtom)
        const userLastVisit = store.getState(userLastVisitAtom)

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

        store.dispatch(updateUser({
            userData: {
                id: userId || '',
                email: userEmail || '',
                password: userPassword || '',
                avatarUrl: 'url',
                role: userRole,
                phone: userPhone || '',
                firstName: userFirstName || '',
                lastName: userLastName || '',
                middleName: userMiddleName || '',
                birthDay: userBirthDay || new Date,
                lastVisit: userLastVisit|| new Date,
            }
        }))
    }
)

const editUserPopupAtom = combine({
    opened: openedAtom,
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
    userLastVisit: userLastVisitAtom,
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