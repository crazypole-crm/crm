import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {TrainingData} from "../TrainingData";
import {CalendarApi} from "../../../../api/calendarApi";
import {remapTrainingDataToApiTrainingData} from "../remapTrainingDataToApiTrainingData";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";
import {Toasts} from "../../../../common/notification/notifications";
import {verify} from "../../../../core/verify";


type CreateTrainingPayload = Omit<TrainingData, 'id' | 'baseId' | 'isCanceled'> & {
    isRepeatable: boolean
}

const createTraining = declareAsyncAction<CreateTrainingPayload>(
    'createTraining',
    (trainingData, store) => {
        const remappedTraining = remapTrainingDataToApiTrainingData(trainingData)

        return CalendarApi.createTraining({
            ...remappedTraining,
            isRepeatable: trainingData.isRepeatable,
        })
            .then(() => {
                Toasts.success('Занятие успешно создано')
                const lastLoadedPeriod = verify(store.getState(lastLoadedPeriodAtom))
                store.dispatch(loadTrainingsForPeriod({
                    startDate: lastLoadedPeriod.startDate,
                    endDate: lastLoadedPeriod.endDate,
                }))
            })
            .catch(error => {
                Toasts.error('При создании занятия произошла ошибка')
            })
    }
)

export {
    createTraining,
}