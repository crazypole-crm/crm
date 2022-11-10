import {getArrayWithNElements} from "../../../../../../core/array/array";
import {EmptyCalendarCell} from "../cells/EmptyCalendarCell";
import styles from "./WeekCalendarTimeRow.module.css";
import {CalendarRow} from "../../common/CalendarRow";
import {compareTime, Time} from "../../../../../viewModel/calendar/time";
import {TrainingData} from "../../../../../viewModel/calendar/TrainingData";
import { normalizeDate } from "../../../../users/table/userTableDataConvert";
import {verify} from "../../../../../../core/verify";
import {useMemo} from "react";
import {normalizeDayNumber} from "../../../../../viewModel/calendar/normalizeDayNumber";
import {TrainingCalendarCell} from "../cells/TraininsCell";

// function calculate

type WeekCalendarRowProps = {
    weekLength: number,
    trainings: TrainingData[],
    time: Time,
}

function isTrainingInThisDay(trainingDate: TrainingData, dayIndex: number) {
    const date = new Date()
    date.setFullYear(trainingDate.date.year)
    date.setMonth(trainingDate.date.month)
    date.setDate(trainingDate.date.date)

    return normalizeDayNumber(date) === dayIndex
}

function WeekCalendarRow({
    weekLength,
    trainings,
    time,
}: WeekCalendarRowProps) {
    const items = getArrayWithNElements(weekLength).map(index => {
        const rowTraining = trainings.find(training => isTrainingInThisDay(training, index))
        if (rowTraining) {
           return (
               <TrainingCalendarCell
                   key={index}
                   trainingData={rowTraining}
                   time={time}
               />
           )
        }
        return (
            <EmptyCalendarCell
                key={index}
                time={time}
            />
        )
    })


    return (
        <CalendarRow className={styles.row}>
            <>
                {items}
            </>
        </CalendarRow>
    )
}

type WeekCalendarTimeRowProps = {
    time: Time,
    weekLength: number,
    trainings: TrainingData[],
    rowsCount: number,
}


function getRowToTrainingsMap(trainings: TrainingData[]) {
    const rowToTrainingsMap: Map<number, TrainingData[]> = new Map()

    const sortedTrainings = [...trainings].sort((training1, trainings2) => compareTime(training1.timeStart, trainings2.timeStart))

    const dateToTrainingsMap: Map<number, TrainingData[]> = new Map()

    sortedTrainings.forEach(training => {
        const trainingDate = training.date.date
        if (!dateToTrainingsMap.get(trainingDate)) {
            dateToTrainingsMap.set(trainingDate, [training])
            return
        }
        verify(dateToTrainingsMap.get(trainingDate)).push(training)
    })

    Array.from(dateToTrainingsMap.keys()).forEach(date => {
        const trainings = verify(dateToTrainingsMap.get(date))
        trainings.forEach((training, index) => {
            if (!rowToTrainingsMap.get(index)) {
                rowToTrainingsMap.set(index, [training])
                return
            }
            verify(rowToTrainingsMap.get(index)).push(training)
        })
    })

    return rowToTrainingsMap
}


function WeekCalendarTimeRow({
    weekLength,
    time,
    trainings,
    rowsCount,
}: WeekCalendarTimeRowProps) {
    const rowToTrainingsMap = useMemo(() => getRowToTrainingsMap(trainings), [trainings])

    const rowsItems = useMemo(() => {
        return getArrayWithNElements(rowsCount).map((_, index) => {
            const trainings = rowToTrainingsMap.get(index)
            return <WeekCalendarRow
                key={index}
                weekLength={weekLength}
                time={time}
                trainings={trainings || []}
            />
        })
    }, [rowToTrainingsMap, rowsCount, weekLength, time])

    return (
        <div className={styles.weekTimeRow}>
            {rowsItems}
            <div className={styles.timeTitle}>{[normalizeDate(String(time.hour)), normalizeDate(String(time.minutes))].join(':')}</div>
        </div>
    )
}

export {
    WeekCalendarTimeRow,
}