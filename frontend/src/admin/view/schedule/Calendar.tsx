import styles from './Calendar.module.css'
import {CalendarSwitcher} from "./CalendarSwitcher";
import {useEffect, useMemo, useState} from "react";
import {WeekCalendar} from "./WeekCalendar";
import {calculateWeekStartDate} from "../../viewModel/calendar/calculateWeekStartDate";
import {CalendarSidePanel} from "../calendarSidePanel/CalendarSidePanel";
import {FilterData} from "../../viewModel/filterPanel/FilterData";
import {HallData} from "../../viewModel/hall/HallData";
import {DirectionData} from "../../viewModel/direction/DirectionData";
import {UserData} from "../../viewModel/users/UserData";
import {useAction, useAtom} from "@reatom/react";
import {hallsAtom} from "../../viewModel/hall/halls";
import {directionsAtom} from "../../viewModel/direction/directions";
import {trainersAtom} from "../../viewModel/users/users";
import {TrainingData} from "../../viewModel/calendar/TrainingData";
import {trainingsAtom} from "../../viewModel/calendar/trainings";
import {loadTrainingsForPeriod, trainingsLoadingAtom} from "../../viewModel/calendar/loadTrainingsForPeriod";
import {Time} from "../../viewModel/calendar/time";
import {calendarSettingsAtom} from "../../viewModel/calendar/calendartSettings/calendarSettings";

type CalendarType = 'week' | 'work-week' | 'day'

const WEEK_LENGTH = 7
const DAY_START_TIME = {
    hour: 7,
    minutes: 0,
}
const DAY_END_TIME = {
    hour: 22,
    minutes: 0,
}

function getFilterItems(directions: DirectionData[], halls: HallData[], trainers: UserData[]): FilterData[] {
    const directionsFilters: FilterData = {
        id: 'directions',
        name: 'Направление',
        items: directions.map(direction => ({
            id: direction.id,
            name: direction.name
        }))
    }

    const hallsFilters: FilterData = {
        id: 'halls',
        name: 'Зал',
        items: halls.map(hall => ({
            id: hall.id,
            name: hall.name
        }))
    }

    const trainersFilters: FilterData = {
        id: 'trainers',
        name: 'Преподаватель',
        items: trainers.map(trainer => ({
            id: trainer.id,
            name: `${trainer.lastName} ${trainer.firstName} ${trainer.middleName}`
        }))
    }

    return [
        hallsFilters,
        directionsFilters,
        trainersFilters,
    ]
}

function getFilteredTrainings(trainings: TrainingData[], filters: string[]) {
    if (!filters.length) {
        return trainings
    }
    return trainings.filter(training => {
        return filters.every(filterId => [training.hallId, training.trainerId, training.directionId].includes(filterId))
    })
}

type CalendarConfig = {
    weekLength: 5 | 7,
    dayStartTime: Time,
    dayEndTime: Time,
}

function setTimeToDate(date: Date, time: Time) {
    date.setHours(time.hour)
    date.setMinutes(time.minutes)
}

function getPeriod(calendarType: CalendarType, periodStartDate: Date, calendarConfig: CalendarConfig): {startDate: Date, endDate: Date} {
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
    return {
        startDate: startPeriod,
        endDate: endPeriod,
    }
}


function Calendar() {
    const [calendarType, setCalendarType] = useState<CalendarType>('week')
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()))
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [lastWeekDateStart, setLastWeekDateStart] = useState<Date>(calculateWeekStartDate(selectedDate))
    const calendarSettings = useAtom(calendarSettingsAtom)
    const halls = useAtom(hallsAtom)
    const directions = useAtom(directionsAtom)
    const trainers = useAtom(trainersAtom)
    const trainings = useAtom(trainingsAtom)
    const trainingsLoading = useAtom(trainingsLoadingAtom)
    const handleLoadTrainings = useAction(loadTrainingsForPeriod)

    useEffect(() => {
        const weekDateStart = calculateWeekStartDate(selectedDate)
        if (lastWeekDateStart.getFullYear() !== weekDateStart.getFullYear()
            || lastWeekDateStart.getMonth() !== weekDateStart.getMonth()
            || lastWeekDateStart.getDate() !== weekDateStart.getDate()) {
            setLastWeekDateStart(weekDateStart)
        }
    }, [selectedDate, lastWeekDateStart, setLastWeekDateStart])

    useEffect(() => {
        const period = getPeriod(calendarType, lastWeekDateStart, {
            weekLength: WEEK_LENGTH,
            dayEndTime: calendarSettings.dayStartTime,
            dayStartTime: calendarSettings.dayEndTime,
        })
        handleLoadTrainings(period)
    }, [calendarType, lastWeekDateStart, handleLoadTrainings])

    const filtersList = useMemo(() => getFilterItems(
        Object.values(directions),
        Object.values(halls),
        trainers
    ), [directions, halls, trainers])

    const filteredTrainings = useMemo(() => getFilteredTrainings(Object.values(trainings), selectedFilters), [trainings, selectedFilters])

    return (
        <div className={styles.calendarLayout}>
            <div className={styles.calendarWrapper}>
                <CalendarSwitcher calendarType={calendarType} onCalendarTypeChanged={setCalendarType} />
                {
                    calendarType === 'week' || calendarType === 'work-week'
                        ? <WeekCalendar
                            weekStartDate={lastWeekDateStart}
                            selectedDate={selectedDate}
                            weekLength={calendarType === 'week' ? 7 : 5}
                            startTime={calendarSettings.dayStartTime}
                            endTime={calendarSettings.dayEndTime}
                            timeStep={calendarSettings.stepTime}
                            loading={trainingsLoading}
                            trainings={filteredTrainings}
                        />
                        : <div>Day Calendar</div>
                }
            </div>
            <CalendarSidePanel
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                filterList={filtersList}
                selectedFilters={selectedFilters}
                onFiltersChange={setSelectedFilters}
            />
        </div>
    )
}

export type {
    CalendarType
}

export {
    Calendar,
}