import {useEffect, useState} from "react";
import {TrainingData} from "./TrainingData";
import {loadTrainingsForPeriod} from "./loadTrainingsForPeriod";
import {CalendarType} from "../../view/schedule/Calendar";
import {Time} from "./time";

type CalendarConfig = {
    weekLength: 5 | 7,
    dayStartTime: Time,
    dayEndTime: Time,
}

function setTimeToDate(date: Date, time: Time) {
    date.setHours(time.hour)
    date.setMinutes(time.minutes)
}

function useTrainingsLoader(calendarType: CalendarType, periodStartDate: Date, calendarConfig: CalendarConfig): [TrainingData[], boolean] {
    const [trainings, setTrainings] = useState<TrainingData[]>([])
    const [trainingsLoading, setTrainingsLoading] = useState(true)

    useEffect(() => {
        setTrainingsLoading(true)
        let startPeriod: Date
        let endPeriod: Date
        if (calendarType === 'week') {
            startPeriod = new Date(periodStartDate)
            setTimeToDate(startPeriod, calendarConfig.dayStartTime)

            endPeriod = new Date(periodStartDate)
            endPeriod.setDate(endPeriod.getDate() + (calendarConfig.weekLength - 1))
            setTimeToDate(endPeriod, calendarConfig.dayEndTime)
        }
        else {
            startPeriod = new Date(periodStartDate)
            setTimeToDate(startPeriod, calendarConfig.dayStartTime)

            endPeriod = new Date(periodStartDate)
            setTimeToDate(endPeriod, calendarConfig.dayEndTime)
        }

        loadTrainingsForPeriod(startPeriod, endPeriod, trainings => {
            setTrainingsLoading(false)
            const filteredTrainings = trainings.filter(training => {
                const trainingDate = new Date()
                trainingDate.setFullYear(training.date.year)
                trainingDate.setMonth(training.date.month)
                trainingDate.setDate(training.date.date)
                setTimeToDate(trainingDate, training.timeStart)
                const trainingTime = trainingDate.getTime()
                return trainingTime >= startPeriod.getTime() && trainingTime <= endPeriod.getTime()
            })
            setTrainings(filteredTrainings)
        })
    }, [periodStartDate, calendarType, calendarConfig.dayEndTime, calendarConfig.dayStartTime])

    return [trainings, trainingsLoading]
}

export {
    useTrainingsLoader,
}