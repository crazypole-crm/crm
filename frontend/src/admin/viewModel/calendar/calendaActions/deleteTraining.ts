import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {processStandardError} from "../../../../core/error/processStandardError";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";


const deleteTraining = declareAsyncAction<string>(
    'deleteTraining',
    (baseId, store) => {
        return CalendarApi.deleteTraining(baseId)
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