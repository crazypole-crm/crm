import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import { TrainingData } from "../TrainingData";
import {CalendarApi} from "../../../../api/calendarApi";
import {processStandardError} from "../../../../core/error/processStandardError";
import {trainingsActions} from "../trainings";
import {remapTrainingDataToApiTrainingData} from "../remapTrainingDataToApiTrainingData";

const saveTraining = declareAsyncAction<TrainingData>(
    'saveTraining',
    (trainingData, store) => {
        const remappedTraining = {
            trainingId: trainingData.id,
            baseId: trainingData.baseId,
            ...remapTrainingDataToApiTrainingData(trainingData)
        }
        return CalendarApi.editTraining(remappedTraining)
            .then(() => {
                console.log('saveTraining trainingData', trainingData)
                store.dispatch(trainingsActions.updateTraining({
                    ...trainingData,
                }))
            })
            .catch(processStandardError)
    }
)

export {
    saveTraining,
}