import {compareTime, Time} from '../../../../viewModel/calendar/time'
import styles from './WeekCalendarGrid.module.css'
import {useMemo} from "react";
import {TrainingData} from "../../../../viewModel/calendar/TrainingData";
import {verify} from "../../../../../core/verify";
import {WeekCalendarTimeRow} from "./rows/WeekCalendarTimeRow";


type WeekCalendarGridProps = {
    timeStep: Time,
    startTime: Time,
    endTime: Time,
    weekLength: number,
    trainings: TrainingData[],
}

function generateTimePoints(timeStep: Time, startTime: Time, endTime: Time) {
    const startDate = new Date()
    startDate.setHours(startTime.hour)
    startDate.setMinutes(startTime.minutes)

    const endDate = new Date()
    endDate.setHours(endTime.hour)
    endDate.setMinutes(endTime.minutes)

    const points: Time[] = []

    while (startDate < endDate) {
        points.push({
            hour: startDate.getHours(),
            minutes: startDate.getMinutes(),
        })
        startDate.setHours(startDate.getHours() + timeStep.hour)
        startDate.setMinutes(startDate.getMinutes() + timeStep.minutes)
    }

    return points
}

function calculateTrainingsToPoint(trainings: TrainingData[], timePoints: Time[]) {
    const timeToTrainingsMap: Map<Time, TrainingData[]> = new Map()
    timePoints.forEach(timePoint => {
        timeToTrainingsMap.set(timePoint, [])
    })

    trainings.forEach(training => {
        const timePointIndex = timePoints.findIndex(timePoint => {
            const compareResult = compareTime(training.timeStart, timePoint)
            return compareResult < 0
        })
        const timePoint = timePoints[timePointIndex - 1]
        const timePointTrainings = timeToTrainingsMap.get(timePoint)
        timePointTrainings && timePointTrainings.push(training)
    })

    return timeToTrainingsMap
}

function calculateRowsCount(timeToTrainingsMap: Map<Time, TrainingData[]>, time: Time) {
    let rowsCount = 1
    const dateToTrainingCountMap: Map<number, TrainingData[]> = new Map()

    const trainings = verify(timeToTrainingsMap.get(time))
    trainings.forEach(training => {
        const trainingDate = training.date.date
        if (!dateToTrainingCountMap.get(trainingDate)) {
            dateToTrainingCountMap.set(trainingDate, [training])
            return
        }
        verify(dateToTrainingCountMap.get(trainingDate)).push(training)
    })

    Array.from(dateToTrainingCountMap.keys()).forEach(date => {
        rowsCount = Math.max(rowsCount, verify(dateToTrainingCountMap.get(date)).length)
    })

    return rowsCount
}

function WeekCalendarGrid({
    endTime,
    startTime,
    timeStep,
    weekLength,
    trainings,
}: WeekCalendarGridProps) {
    const timePoints = useMemo(() => generateTimePoints(timeStep, startTime, endTime), [timeStep, endTime, startTime])
    const timeToTrainingsMap = useMemo(() => calculateTrainingsToPoint(trainings, timePoints), [trainings, timePoints])

    return (
        <div className={styles.grid}>
            {timePoints.map((time, index) => {
                const rowsCount = calculateRowsCount(timeToTrainingsMap, time)
                return <WeekCalendarTimeRow
                    key={String(index)}
                    time={time}
                    weekLength={weekLength}
                    trainings={timeToTrainingsMap.get(time) || []}
                    rowsCount={rowsCount}
                />
            })}
        </div>
    )
}

export {
    WeekCalendarGrid,
}
