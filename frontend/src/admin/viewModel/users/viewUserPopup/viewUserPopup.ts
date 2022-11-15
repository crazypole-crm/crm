import {combine, declareAction, declareAtom} from "@reatom/core";
import {UserData, UserRole} from "../UserData";
import {optionalArray} from "../../../../core/array/array";

type OpenPayload = Omit<UserData, 'id' | 'lastVisit'>

const open = declareAction<OpenPayload>('viewUserPopup.open')
const close = declareAction('viewUserPopup.close')

const openedAtom = declareAtom('viewUserPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const fullNameAtom = declareAtom('viewUserPopup.fullName', '', on => [
    on(open, (_, {firstName, lastName, middleName}) => optionalArray([lastName, firstName, middleName]).join(' '))
])

const phoneAtom = declareAtom<string | null>('viewUserPopup.phone', null, on => [
    on(open, (_, {phone}) => phone || null)
])

const roleAtom = declareAtom<UserRole>('viewUserPopup.role', 'client', on => [
    on(open, (_, {role}) => role)
])

const emailAtom = declareAtom<string>('viewUserPopup.email', '', on => [
    on(open, (_, {email}) => email)
])

const avatarUrlAtom = declareAtom<string|null>('viewUserPopup.avatarUrl', null, on => [
    on(open, (_, {avatarUrl}) => avatarUrl || null),
])

const birthDayAtom = declareAtom<Date|null>('viewUserPopup.birthDay', null, on => [
    on(open, (_, {birthDay}) => birthDay || null),
])

const viewUserPopupAtom = combine({
    opened: openedAtom,
    fullName: fullNameAtom,
    phone: phoneAtom,
    role: roleAtom,
    email: emailAtom,
    avatarUrl: avatarUrlAtom,
    birthDay: birthDayAtom,
})

const viewUserPopupActions = {
    open,
    close,
}

export {
    viewUserPopupActions,
    viewUserPopupAtom,
}