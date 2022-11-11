import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import { TrainingData } from "./TrainingData";
import {CalendarApi} from "../../../api/calendarApi";
import {processStandardError} from "../../../core/error/processStandardError";
import {trainingsActions} from "./trainings";

type SaveTrainingPayload = {
    trainingData: TrainingData,
}

const saveTraining = declareAsyncAction<SaveTrainingPayload>(
    'createTraining',
    ({trainingData}, store) => {
        return CalendarApi.editTraining(trainingData)
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