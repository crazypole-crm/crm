import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {TrainingData} from "../TrainingData";
import {CalendarApi} from "../../../../api/calendarApi";
import {processStandardError} from "../../../../core/error/processStandardError";
import {remapTrainingDataToApiTrainingData} from "../remapTrainingDataToApiTrainingData";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";


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
                const lastLoadedPeriod = store.getState(lastLoadedPeriodAtom)
                store.dispatch(loadTrainingsForPeriod({
                    startDate: lastLoadedPeriod.startDate,
                    endDate: lastLoadedPeriod.endDate,
                }))
            })
            .catch(processStandardError)
    }
)

export {
    createTraining,
}