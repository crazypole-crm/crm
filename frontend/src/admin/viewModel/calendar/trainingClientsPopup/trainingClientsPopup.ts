import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {CalendarApi} from "../../../../api/calendarApi";
import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {Toasts} from "../../../../common/notification/notifications";
import {remapApiRegistrationDataToModel} from "../../registrations/remapping";

type RegistrationData = {
    id: string,
    userId: string,
    trainingId: string,
    attended: boolean,
}

type OpenPayload = {
    id: string,
}

const open = declareAsyncAction<OpenPayload>('clientTrainingPopup.open',
    async ({id}, store) => {
        return CalendarApi.getTrainingRegistrations(id)
            .then(apiRegistrationsData => {
                const registrations = remapApiRegistrationDataToModel(apiRegistrationsData)
                store.dispatch(setRegistrationsData(registrations))
                return Promise.resolve()
            })
    }
)
const close = declareAction('clientTrainingPopup.close')

const openedAtom = declareAtom('clientTrainingPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const trainingIdAtom = declareAtom('clientTrainingPopup.trainingId', '', on => [
    on(open, (_, {id}) => id),
])

const markClientAttendanceImpl =  declareAction<{registrationId: string, attendance: boolean}>('clientTrainingPopup.markClientAttendanceImpl')

const markClientAttendance = declareAsyncAction<{registrationId: string, attendance: boolean}>('clientTrainingPopup.markClientAttendance',
    ({registrationId, attendance}, store) => {
        const status = attendance ? 1 : 0
        const registrationsDataBeforeChange = store.getState(registrationsDataAtom)
        store.dispatch(markClientAttendanceImpl({registrationId, attendance}))

        return CalendarApi.changeTrainingRegistrationStatus(registrationId, status)
            .catch(() => {
                Toasts.error('При отметке пользователя произошла ошибка')
                store.dispatch(setRegistrationsData(registrationsDataBeforeChange))
            })
    }
)

const removeRegistrationImpl =  declareAction<string>('clientTrainingPopup.removeRegistration')

const removeRegistration = declareAsyncAction<string>('clientTrainingPopup.removeRegistration',
    (registrationId, store) => {
        const registrationsDataBeforeChange = store.getState(registrationsDataAtom)
        store.dispatch(removeRegistrationImpl(registrationId))
        return CalendarApi.removeTrainingRegistrationStatus(registrationId)
            .catch(() => {
                Toasts.error('При удаления записи произошла ошибка')
                store.dispatch(setRegistrationsData(registrationsDataBeforeChange))
            })
    }
)

const [registrationsDataAtom, setRegistrationsData] = declareAtomWithSetter<Array<RegistrationData>>('clientTrainingPopup.registrations', [], on => [
    on(open, () => []),
    on(markClientAttendanceImpl, (state, {attendance, registrationId}) => state.map(registrationData => {
        if (registrationData.id === registrationId) {
            return {
                ...registrationData,
                attended: attendance,
            }
        }
        return registrationData
    })),
    on(removeRegistrationImpl, (state, registrationId) => state.filter(registrationData => registrationData.id !== registrationId))
])

const popupLoadingAtom = declareAtom<boolean>('clientTrainingPopup.popupLoading', true, on =>[
    on(open, () => true),
    on(open.done, () => false),
])

const clientsTrainingPopupAtom = combine({
    opened: openedAtom,
    registrationsData: registrationsDataAtom,
    trainingId: trainingIdAtom,
    popupLoading: popupLoadingAtom,
})

const clientsTrainingPopupActions = {
    open,
    close,
    markClientAttendance,
    setRegistrationsData,
    removeRegistration,
}

export type {
    RegistrationData,
}

export {
    clientsTrainingPopupActions,
    clientsTrainingPopupAtom,
}
