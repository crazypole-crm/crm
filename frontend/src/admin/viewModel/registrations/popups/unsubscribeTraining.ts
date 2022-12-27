import { CalendarApi } from "../../../../api/calendarApi"
import { Toasts } from "../../../../common/notification/notifications"
import { declareAsyncAction } from "../../../../core/reatom/declareAsyncAction"
import { registrationsActions } from "../registrations"

const unsubscribeTraining = declareAsyncAction<string>(
    'unsubscribeTraining',
    (registrationId, store) => {
        return CalendarApi.removeTrainingRegistrationStatus(registrationId)
            .then(() => {
                Toasts.success('Запись на занятие отменена')
                store.dispatch(registrationsActions.removeRegistration([registrationId]))
            })
            .catch(() => {
                Toasts.error('При отписке от занятия произошла ошибка')
            })
    }
)

export {
    unsubscribeTraining,
}