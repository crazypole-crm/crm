import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {TrainingData, TrainingDate} from "./TrainingData";
import {CalendarApi} from "../../../api/calendarApi";
import {processStandardError} from "../../../core/error/processStandardError";
import {trainingsActions} from "./trainings";
import {Time} from "./time";

type TrainingDataImpl = {
    directionId: string,
    trainerId: string,
    hallId: string,
    date: TrainingDate,
    timeStart: Time,
    timeEnd: Time,
    description?: string,
}

type GroupedTrainingData = TrainingDataImpl & {
    type: 'grouped',
    clients: string[],
}

type IndividualTrainingData = TrainingDataImpl & {
    type: 'individual',
    clientId: string,
}

type CreateTrainingPayload = {
    trainingData: GroupedTrainingData | IndividualTrainingData,
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