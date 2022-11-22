import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import { TrainingData } from "../TrainingData";
import {CalendarApi} from "../../../../api/calendarApi";
import {processStandardError} from "../../../../core/error/processStandardError";
import {trainingsActions} from "../trainings";
import {remapTrainingDataToApiTrainingData} from "../remapTrainingDataToApiTrainingData";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";

const saveTraining = declareAsyncAction<Omit<TrainingData, 'isCanceled'>>(
    'saveTraining',
    (trainingData, store) => {
        const remappedTraining = {
            trainingId: trainingData.id,
            baseTrainingId: trainingData.baseId,
            ...remapTrainingDataToApiTrainingData(trainingData)
        }
        return CalendarApi.editTraining(remappedTraining)
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
    saveTraining,
}