import styles from './Calendar.module.css'
import {CalendarSwitcher} from "./CalendarSwitcher";
import {useMemo, useState} from "react";
import {WeekCalendar} from "./WeekCalendar";
import {calculateWeekStartDate} from "../../viewModel/calendar/calculateWeekStartDate";
import {useTrainingsLoader} from "../../viewModel/calendar/useTrainingsLoader";

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

function Calendar() {
    const [calendarType, setCalendarType] = useState<CalendarType>('week')
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()))

    const weekDateStart = useMemo(() => calculateWeekStartDate(selectedDate), [selectedDate])

    const [trainings, trainingsLoading] = useTrainingsLoader(calendarType, weekDateStart, {
        weekLength: WEEK_LENGTH,
        dayEndTime: DAY_END_TIME,
        dayStartTime: DAY_START_TIME,
    })

    return (
        <div className={styles.calendarWrapper}>
            <CalendarSwitcher calendarType={calendarType} onCalendarTypeChanged={setCalendarType} />
            {
                calendarType === 'week'
                    ? <WeekCalendar
                        weekStartDate={weekDateStart}
                        selectedDate={selectedDate}
                        weekLength={WEEK_LENGTH}
                        startTime={DAY_START_TIME}
                        endTime={DAY_END_TIME}
                        loading={trainingsLoading}
                        trainings={trainings}
                    />
                    : <div>Day Calendar</div>
            }
        </div>
    )
}

export type {
    CalendarType
}

export {
    Calendar,
}