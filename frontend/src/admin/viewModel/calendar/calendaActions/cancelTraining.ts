import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";
import {Toasts} from "../../../../common/notification/notifications";
import {verify} from "../../../../core/verify";

const cancelTraining = declareAsyncAction<string>(
    'cancelTraining',
    (trainingId, store) => {
        return CalendarApi.cancelTraining(trainingId)
            .then(() => {
                Toasts.success('Занятие успешно отменено')
                const lastLoadedPeriod = verify(store.getState(lastLoadedPeriodAtom))
                store.dispatch(loadTrainingsForPeriod({
                    startDate: lastLoadedPeriod.startDate,
                    endDate: lastLoadedPeriod.endDate,
                }))
            })
            .catch(() => Toasts.error('При отмене занятия произошла ошибка'))
    }
)

export {
    cancelTraining
}