import {normalizeDayNumber} from "./normalizeDayNumber";
import {CalendarType} from "../../view/schedule/Calendar";


function calculateWeekStartDate(date: Date, calendarType: CalendarType) {
    if (calendarType === 'week' || calendarType === 'work-week') {
        const day = normalizeDayNumber(date)
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() - day)
        return newDate
    }
    return date
}

export {
    calculateWeekStartDate,
}