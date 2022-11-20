import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {trainingsActions} from "../trainings";
import {processStandardError} from "../../../../core/error/processStandardError";


const deleteTraining = declareAsyncAction<string>(
    'deleteTraining',
    (trainingId, store) => {
        return CalendarApi.deleteTraining(trainingId)
            .then(() => {
                console.log('deleteTraining', trainingId)
                store.dispatch(trainingsActions.removeTrainings([trainingId]))
            })
            .catch(processStandardError)
    }
)

export {
    deleteTraining,
}