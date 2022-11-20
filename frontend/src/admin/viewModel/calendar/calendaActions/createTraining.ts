import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {TrainingData} from "../TrainingData";
import {CalendarApi} from "../../../../api/calendarApi";
import {processStandardError} from "../../../../core/error/processStandardError";
import {trainingsActions} from "../trainings";
import {remapTrainingDataToApiTrainingData} from "../remapTrainingDataToApiTrainingData";


const createTraining = declareAsyncAction<Omit<TrainingData, 'id'>>(
    'createTraining',
    (trainingData, store) => {
        const remappedTraining = remapTrainingDataToApiTrainingData(trainingData)

        return CalendarApi.createTraining(remappedTraining)
            .then(({trainingId}) => {
                store.dispatch(trainingsActions.updateTraining({
                    ...trainingData,
                    id: trainingId
                }))
            })
            .catch(processStandardError)
    }
)

export {
    createTraining,
}