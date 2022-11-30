import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";
import {Toasts} from "../../../../common/notification/notifications";

type ReplaceTrainerPayload = {
    trainingId: string,
    trainerId: string,
}

const replaceTrainer = declareAsyncAction<ReplaceTrainerPayload>(
    'replaceTrainer',
    ({trainingId, trainerId,}, store) => {
        Toasts.success('Тренер успешно заменен')
        return CalendarApi.replaceTrainingTrainer(trainingId, trainerId)
            .then(() => {
                const lastLoadedPeriod = store.getState(lastLoadedPeriodAtom)
                store.dispatch(loadTrainingsForPeriod({
                    startDate: lastLoadedPeriod.startDate,
                    endDate: lastLoadedPeriod.endDate,
                }))
            })
            .catch(() => Toasts.error('При замене тренера произошла ошибка'))
    }
)

export {
    replaceTrainer,
}