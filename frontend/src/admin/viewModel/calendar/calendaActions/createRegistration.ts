import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {Toasts} from "../../../../common/notification/notifications";
import {trainingsActions, trainingsAtom} from "../trainings";

type CreateRegistration = {
    trainingId: string,
    userId: string,
}

const createRegistration = declareAsyncAction<CreateRegistration>('createRegistration',
    ({trainingId, userId}, store) => {
        const trainings = store.getState(trainingsAtom)
        return CalendarApi.createRegistration(trainingId, userId)
            .then(() => {
                const training = trainings[trainingId]
                const currentAvailableRegistrationsCount = training.availableRegistrationsCount
                store.dispatch(trainingsActions.updateTraining({
                    ...training,
                    availableRegistrationsCount: currentAvailableRegistrationsCount - 1,
                }))

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