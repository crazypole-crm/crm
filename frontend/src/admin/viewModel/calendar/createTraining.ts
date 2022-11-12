import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import { TrainingData } from "./TrainingData";
import {CalendarApi} from "../../../api/calendarApi";
import {processStandardError} from "../../../core/error/processStandardError";
import {trainingsActions} from "./trainings";

type CreateTrainingPayload = {
    trainingData: Omit<TrainingData, 'id'>,
}

const createTraining = declareAsyncAction<CreateTrainingPayload>(
    'createTraining',
    ({trainingData}, store) => {
        return CalendarApi.createTraining(trainingData)
            .then(({id}) => {
                store.dispatch(trainingsActions.updateTraining({
                    ...trainingData,
                    id
                }))
            })
            .catch(processStandardError)
    }
)

export {
    createTraining,
}