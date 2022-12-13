import {combine, declareAction, declareAtom} from "@reatom/core";
import {UserRole} from "../../users/UserData";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {sendNotification} from "./sendNotification";
import {verify} from "../../../../core/verify";

const open = declareAction('sendCustomNotificationPopup.open')
const close = declareAction('sendCustomNotificationPopupAtom.close')

const openedAtom = declareAtom('sendCustomNotificationPopupAtom.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(sendNotification.done, () => false)
])

const [consumersRoleAtom, setConsumersRole] = declareAtomWithSetter<UserRole|null>('sendCustomNotificationPopupAtom.opened', null)
const [roleErrorAtom, setRoleError] = declareAtomWithSetter('sendCustomNotificationPopupAtom.roleError', '', on => [
    on(setConsumersRole, () => '')
])

const [titleAtom, setTitle] = declareAtomWithSetter<string>('sendCustomNotificationPopupAtom.title', '')
const [titleErrorAtom, setTitleError] = declareAtomWithSetter('sendCustomNotificationPopupAtom.titleError', '', on => [
    on(setTitle, () => '')
])

const [bodyAtom, setBody] = declareAtomWithSetter<string>('sendCustomNotificationPopupAtom.body', '')
const [bodyErrorAtom, setBodyError] = declareAtomWithSetter('sendCustomNotificationPopupAtom.bodyError', '', on => [
    on(setBody, () => '')
])

const submit = declareAction('sendCustomNotificationPopupAtom.submit',
    (_, store) => {
        const title = store.getState(titleAtom)
        const body = store.getState(bodyAtom)
        const consumersRole = store.getState(consumersRoleAtom)

        store.dispatch(setTitleError(title ? '' : 'Поле заголовок обязательное!'))
        store.dispatch(setBodyError(body ? '' : 'Поле текст обязательное!'))
        store.dispatch(setRoleError(consumersRole ? '' : 'Поле роль обязательное!'))

        const titleError = store.getState(titleErrorAtom)
        const bodyError = store.getState(bodyErrorAtom)

        if (titleError || bodyError) {
            return
        }

        store.dispatch(sendNotification({
            body,
            title,
            role: verify(consumersRole),
        }))
    }
)

const sendCustomNotificationPopupAtom = combine({
    opened: openedAtom,
    consumersRole: consumersRoleAtom,
    title: titleAtom,
    body: bodyAtom,
    roleError: roleErrorAtom,
    titleError: titleErrorAtom,
    bodyError: bodyErrorAtom,
})

const sendCustomNotificationPopupActions = {
    open,
    close,
    setConsumersRole,
    setTitle,
    setBody,
    submit,
}

export {
    sendCustomNotificationPopupActions,
    sendCustomNotificationPopupAtom,
}