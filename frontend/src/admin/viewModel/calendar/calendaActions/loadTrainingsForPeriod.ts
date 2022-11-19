import {Api_TrainingData, CalendarApi} from "../../../../api/calendarApi";
import {declareAtom} from "@reatom/core";
import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {trainingsActions} from "../trainings";
import {Time} from "../time";
import {TrainingData} from "../TrainingData";
import {getValueByCheckedKey} from "../../../../core/getValueByCheckedKey";
import {processStandardError} from "../../../../core/error/processStandardError";

type LoadTrainingsForPeriodPayload = {
    startDate: Date,
    endDate: Date,
}

function setTimeToDate(date: Date, time: Time) {
    date.setHours(time.hour)
    date.setMinutes(time.minutes)
}

function remapApiTrainingDataToTrainingData(trainingsData: Api_TrainingData[]): TrainingData[] {
    return trainingsData.map(trainingData => {
        const remappedStartDate = new Date(trainingData.startDate * 1000)
        const remappedEndDate = new Date(trainingData.endDate * 1000)

        return {
            id: trainingData.trainingId,
            date: {
                date: remappedStartDate.getDate(),
                year: remappedStartDate.getFullYear(),
                month: remappedStartDate.getMonth(),
            },
            timeStart: {
                hour: remappedStartDate.getHours(),
                minutes: remappedStartDate.getMinutes(),
            },
            timeEnd: {
                hour: remappedEndDate.getHours(),
                minutes: remappedEndDate.getMinutes(),
            },
            type: getValueByCheckedKey(trainingData.type, {
                'group': 'grouped',
                'individual': 'individual'
            }),
            trainerId: trainingData.trainerId,
            directionId: trainingData.courseId,
            hallId: trainingData.hallId,
            description: trainingData.description,
        }
    })
}

const loadTrainingsForPeriod = declareAsyncAction<LoadTrainingsForPeriodPayload>(
    'loadTrainingsForPeriod',
    ({endDate, startDate}, store) => {
        return CalendarApi.getTrainingsForPeriod(startDate, endDate)
            .then((trainings) => {
                const remappedTrainings = remapApiTrainingDataToTrainingData(trainings)

                const filteredTrainings = remappedTrainings.filter(training => {
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
            .catch(processStandardError)
    }
)

const trainingsLoadingAtom = declareAtom('trainingsLoading', false, on => [
    on(loadTrainingsForPeriod, () => true),
    on(loadTrainingsForPeriod.done, () => false),
])

export {
    loadTrainingsForPeriod,
    trainingsLoadingAtom,
}