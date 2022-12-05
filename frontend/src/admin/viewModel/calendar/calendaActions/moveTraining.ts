import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../../api/calendarApi";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";
import {TrainingDate} from "../TrainingData";
import {Time} from "../time";
import {convertTrainingDataToDate} from "../DataConverting";
import {Toasts} from "../../../../common/notification/notifications";
import {verify} from "../../../../core/verify";


type MoveTrainingPayload = {
    trainingId: string,
    trainingDate: TrainingDate,
    trainingStartTime: Time,
    trainingEndTime: Time,
}

const moveTraining = declareAsyncAction<MoveTrainingPayload>(
    'moveTraining',
    ({trainingId, trainingStartTime, trainingEndTime, trainingDate}, store) => {
        const startDate = convertTrainingDataToDate(trainingDate, trainingStartTime)
        const endDate = convertTrainingDataToDate(trainingDate, trainingEndTime)

        return CalendarApi.moveTraining(trainingId, startDate.getTime(), endDate.getTime())
            .then(() => {
                Toasts.success('Занятие успешно перенесено')
                const lastLoadedPeriod = verify(store.getState(lastLoadedPeriodAtom))
                store.dispatch(loadTrainingsForPeriod({
                    startDate: lastLoadedPeriod.startDate,
                    endDate: lastLoadedPeriod.endDate,
                }))
            })
            .catch(() => Toasts.error('При переносе занятия произошла ошибка'))
    }
)

export {
    moveTraining,
}