import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {Toasts} from "../../../../common/notification/notifications";

type CreateRegistration = {
    trainingId: string,
    userId: string,
}

const createRegistration = declareAsyncAction<CreateRegistration>('createRegistration',
    ({trainingId, userId}, store) => {
        return CalendarApi.createRegistration(trainingId, userId)
            .then(() => {
                Toasts.success('Запись успешно создана')
                return Promise.resolve()
            })
            .catch(() => {
                Toasts.error('При записи на занятие произошла ошибка')
                return Promise.reject()
            })
    }
)

export {
    createRegistration,
}