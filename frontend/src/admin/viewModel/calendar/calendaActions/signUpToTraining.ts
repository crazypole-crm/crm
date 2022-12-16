import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {Toasts} from "../../../../common/notification/notifications";


const signUpToTraining = declareAsyncAction<string>('signUpToTraining',
    (trainingId, store) => {
        return CalendarApi.signUpToTraining(trainingId)
            .then(() => {
                Toasts.success('Вы успешно записались на занятие')
                return Promise.resolve()
            })
            .catch(() => {
                Toasts.error('При записи на занятие произошла ошибка')
                return Promise.reject()
            })
    }
)

export {
    signUpToTraining,
}