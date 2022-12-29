import { CalendarApi } from "../../../../api/calendarApi"
import { Toasts } from "../../../../common/notification/notifications"
import { declareAsyncAction } from "../../../../core/reatom/declareAsyncAction"
import {registrationsActions, registrationsAtom} from "../registrations"

const unsubscribeTraining = declareAsyncAction<string>(
    'unsubscribeTraining',
    (trainingId, store) => {
        const registrations = store.getState(registrationsAtom)
        const registrationId = registrations[trainingId].id
        return CalendarApi.removeTrainingRegistrationStatus(registrationId)
            .then(() => {
                Toasts.success('Запись на занятие отменена')
                store.dispatch(registrationsActions.removeRegistration([trainingId]))
            })
            .catch(() => {
                Toasts.error('При отписке от занятия произошла ошибка')
            })
    }
)

export {
    unsubscribeTraining,
}