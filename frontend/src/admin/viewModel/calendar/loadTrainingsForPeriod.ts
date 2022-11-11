import {CalendarApi} from "../../../api/calendarApi";
import {declareAtom} from "@reatom/core";
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {trainingsActions} from "./trainings";
import {Time} from "./time";

type LoadTrainingsForPeriodPayload = {
    startDate: Date,
    endDate: Date,
}

function setTimeToDate(date: Date, time: Time) {
    date.setHours(time.hour)
    date.setMinutes(time.minutes)
}

const loadTrainingsForPeriod = declareAsyncAction<LoadTrainingsForPeriodPayload>(
    'loadTrainingsForPeriod',
    ({endDate, startDate}, store) => {
        return CalendarApi.getTrainingsForPeriod(startDate, endDate)
            .then((trainings) => {
                const filteredTrainings = trainings.filter(training => {
                    const trainingDate = new Date()
                    trainingDate.setFullYear(training.date.year)
                    trainingDate.setMonth(training.date.month)
                    trainingDate.setDate(training.date.date)
                    setTimeToDate(trainingDate, training.timeStart)
                    const trainingTime = trainingDate.getTime()
                    return trainingTime >= startDate.getTime() && trainingTime <= endDate.getTime()
                })
                store.dispatch(trainingsActions.setNewTrainings(filteredTrainings))
            })
    }
)

const trainingsLoadingAtom = declareAtom('trainingsLoading', false, on => [
    on(loadTrainingsForPeriod, () => true),
    on(loadTrainingsForPeriod.done, () => false),
    on(loadTrainingsForPeriod.fail, () => false),
])

export {
    loadTrainingsForPeriod,
    trainingsLoadingAtom,
}