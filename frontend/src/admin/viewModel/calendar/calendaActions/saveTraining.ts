import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {TrainingData} from "../TrainingData";
import {CalendarApi} from "../../../../api/calendarApi";
import {remapTrainingDataToApiTrainingData} from "../remapTrainingDataToApiTrainingData";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";
import {Toasts} from "../../../../common/notification/notifications";
import {verify} from "../../../../core/verify";

type SaveTrainingPayload = Omit<TrainingData, 'isCanceled' | 'availableRegistrationsCount'>

const saveTraining = declareAsyncAction<SaveTrainingPayload>(
    'saveTraining',
    (trainingData, store) => {
        const remappedTraining = {
            trainingId: trainingData.id,
            baseTrainingId: trainingData.baseId,
            ...remapTrainingDataToApiTrainingData(trainingData)
        }
        return CalendarApi.editTraining(remappedTraining)
            .then(() => {
                Toasts.success('Занятие успешно изменено')
                const lastLoadedPeriod = verify(store.getState(lastLoadedPeriodAtom))
                store.dispatch(loadTrainingsForPeriod({
                    startDate: lastLoadedPeriod.startDate,
                    endDate: lastLoadedPeriod.endDate,
                }))
            })
            .catch(() => Toasts.error('При изменении занятия произошла ошибка'))
    }
)

export {
    saveTraining,
}