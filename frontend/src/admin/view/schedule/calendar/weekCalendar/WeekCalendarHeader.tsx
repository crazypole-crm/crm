import {CalendarRow} from "../common/CalendarRow";
import {CalendarCell} from "../common/CalendarCell";
import {normalizeDayNumber} from "../../../../viewModel/calendar/normalizeDayNumber";
import styles from './WeekCalendarHeader.module.css'
import {getStylesWithMods} from "../../../../../core/styles/getStylesWithMods";
import { getArrayWithNElements } from "../../../../../core/array/array";

type WeekCalendarHeaderProps = {
    weekStartDate: Date,
    weekLength: 5 | 7,
    selectedDate: Date,
}

function getWeekDayTitle(weekDayNumber: number) {
    switch (weekDayNumber) {
        case 0:
            return 'Понедельник'
        case 1:
            return 'Вторник'
        case 2:
            return 'Среда'
        case 3:
            return 'Четверг'
        case 4:
            return 'Пятница'
        case 5:
            return 'Суббота'
        case 6:
            return 'Воскресенье'
    }
}

type WeekDayCellProps = {
    date: Date,
    selected: boolean,
}

function WeekDayCell({
    date,
    selected,
}: WeekDayCellProps) {
    const className = getStylesWithMods(styles.dayCell, {
        [styles.selectedDay]: selected
    })

    return (
        <CalendarCell className={className}>
            <div>
                <div className={styles.dateTitle}>{date.getDate()}</div>
                <div  className={styles.dayTitle}>{getWeekDayTitle(normalizeDayNumber(date))}</div>
            </div>
        </CalendarCell>
    )
}



function WeekCalendarHeader({
    weekLength,
    weekStartDate,
    selectedDate,
}: WeekCalendarHeaderProps) {
    const items: JSX.Element[] = getArrayWithNElements(weekLength).map((index) => {
        const date = new Date(weekStartDate)
        date.setDate(date.getDate() + index)

        return <WeekDayCell
            key={String(index)}
            date={date}
            selected={selectedDate.getDate() === date.getDate()}
        />
    })

    return (
        <CalendarRow className={styles.weekRow}>
            <>
                {items}
            </>
        </CalendarRow>
    )
}

export {
    WeekCalendarHeader,
}
