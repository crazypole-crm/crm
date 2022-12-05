import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";
import {Toasts} from "../../../../common/notification/notifications";
import {verify} from "../../../../core/verify";


const deleteTraining = declareAsyncAction<string>(
    'deleteTraining',
    (baseId, store) => {
        return CalendarApi.deleteTraining(baseId)
            .then(() => {
                Toasts.success('Занятие успешно удалено')
                const lastLoadedPeriod = verify(store.getState(lastLoadedPeriodAtom))
                store.dispatch(loadTrainingsForPeriod({
                    startDate: lastLoadedPeriod.startDate,
                    endDate: lastLoadedPeriod.endDate,
                }))
            })
            .catch(() => Toasts.error('При удалении занятия произошла ошибка'))
    }
)

export {
    deleteTraining,
}