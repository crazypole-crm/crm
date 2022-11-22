import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {processStandardError} from "../../../../core/error/processStandardError";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";


const deleteTraining = declareAsyncAction<string>(
    'deleteTraining',
    (trainingId, store) => {
        return CalendarApi.deleteTraining(trainingId)
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
    deleteTraining,
}