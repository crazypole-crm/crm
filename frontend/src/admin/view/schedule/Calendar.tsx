import styles from './Calendar.module.css'
import {CalendarSwitcher} from "./CalendarSwitcher";
import {useEffect, useMemo, useState} from "react";
import {WeekCalendar} from "./WeekCalendar";
import {calculateWeekStartDate} from "../../viewModel/calendar/calculateWeekStartDate";
import {useTrainingsLoader} from "../../viewModel/calendar/useTrainingsLoader";
import {CalendarSidePanel} from "../calendarSidePanel/CalendarSidePanel";
import {FilterData} from "../../viewModel/filterPanel/FilterData";
import {HallData} from "../../viewModel/hall/HallData";
import {DirectionData} from "../../viewModel/direction/DirectionData";
import {UserData} from "../../viewModel/users/UserData";
import {useAtom} from "@reatom/react";
import {hallsAtom} from "../../viewModel/hall/halls";
import {directionsAtom} from "../../viewModel/direction/directions";
import {trainersAtom} from "../../viewModel/users/users";
import {TrainingData} from "../../viewModel/calendar/TrainingData";

type CalendarType = 'week' | 'day'

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
        return filters.some(filterId => [training.hallId, training.trainerId, training.directionId].includes(filterId))
    })
}

function Calendar() {
    const [calendarType, setCalendarType] = useState<CalendarType>('week')
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()))
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [lastWeekDateStart, setLastWeekDateStart] = useState<Date>(calculateWeekStartDate(selectedDate))
    const halls = useAtom(hallsAtom)
    const directions = useAtom(directionsAtom)
    const trainers = useAtom(trainersAtom)

    useEffect(() => {
        const weekDateStart = calculateWeekStartDate(selectedDate)
        if (lastWeekDateStart.getFullYear() !== weekDateStart.getFullYear()
            || lastWeekDateStart.getMonth() !== weekDateStart.getMonth()
            || lastWeekDateStart.getDate() !== weekDateStart.getDate()) {
            setLastWeekDateStart(weekDateStart)
        }
    }, [selectedDate, lastWeekDateStart, setLastWeekDateStart])


    const [trainings, trainingsLoading] = useTrainingsLoader(calendarType, lastWeekDateStart, {
        weekLength: WEEK_LENGTH,
        dayEndTime: DAY_END_TIME,
        dayStartTime: DAY_START_TIME,
    })

    const filtersList = useMemo(() => getFilterItems(
        Object.values(directions),
        Object.values(halls),
        trainers
    ), [directions, halls, trainers])

    const filteredTrainings = useMemo(() => getFilteredTrainings(trainings, selectedFilters), [trainings, selectedFilters])

    return (
        <div className={styles.calendarLayout}>
            <div className={styles.calendarWrapper}>
                <CalendarSwitcher calendarType={calendarType} onCalendarTypeChanged={setCalendarType} />
                {
                    calendarType === 'week'
                        ? <WeekCalendar
                            weekStartDate={lastWeekDateStart}
                            selectedDate={selectedDate}
                            weekLength={WEEK_LENGTH}
                            startTime={DAY_START_TIME}
                            endTime={DAY_END_TIME}
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