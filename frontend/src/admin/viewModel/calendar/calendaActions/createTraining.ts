import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {TrainingData} from "../TrainingData";
import {CalendarApi} from "../../../../api/calendarApi";
import {remapTrainingDataToApiTrainingData} from "../remapTrainingDataToApiTrainingData";
import {lastLoadedPeriodAtom, loadTrainingsForPeriod} from "./loadTrainingsForPeriod";
import {Toasts} from "../../../../common/notification/notifications";
import {verify} from "../../../../core/verify";
import {HttpStatus} from "../../../../core/http/HttpStatus";


type CreateTrainingPayload = Omit<TrainingData, 'id' | 'baseId' | 'isCanceled' | 'availableRegistrationsCount'> & {
    isRepeatable: boolean,
    maxRegistrationsCount: number,
}

const createTraining = declareAsyncAction<CreateTrainingPayload>(
    'createTraining',
    (trainingData, store) => {
        const remappedTraining = remapTrainingDataToApiTrainingData(trainingData)

        return CalendarApi.createTraining({
            ...remappedTraining,
            isRepeatable: trainingData.isRepeatable,
        })
            .then(() => {
                Toasts.success('Занятие успешно создано')
                const lastLoadedPeriod = verify(store.getState(lastLoadedPeriodAtom))
                store.dispatch(loadTrainingsForPeriod({
                    startDate: lastLoadedPeriod.startDate,
                    endDate: lastLoadedPeriod.endDate,
                }))
            })
            .catch(error => {
                if (error.status === HttpStatus.BAD_REQUEST) {
                    error.json().then((data: {code: string}) => {
                        if (data.code === 'trainers_time_intersection') {
                            Toasts.error('У выбранного тренера в это время уже есть занятие')
                        }
                        else if (data.code === 'halls_time_intersection') {
                            Toasts.error('В это время выбранный зал уже занят')
                        }
                    })
                    return
                }
                Toasts.error('При создании занятия произошла ошибка')
            })
    }
)

export {
    createTraining,
}