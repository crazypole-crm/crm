import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {Toasts} from "../../../../common/notification/notifications";
import {trainingsActions, trainingsAtom} from "../trainings";


const signUpToTraining = declareAsyncAction<string>('signUpToTraining',
    (trainingId, store) => {
        const trainings = store.getState(trainingsAtom)
        return CalendarApi.signUpToTraining(trainingId)
            .then(() => {
                const training = trainings[trainingId]
                const currentAvailableRegistrationsCount = training.availableRegistrationsCount
                store.dispatch(trainingsActions.updateTraining({
                    ...training,
                    availableRegistrationsCount: currentAvailableRegistrationsCount - 1,
                }))
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