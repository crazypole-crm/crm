import {normalizeDayNumber} from "./normalizeDayNumber";


function calculateWeekStartDate(date: Date) {
    const day = normalizeDayNumber(date)
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() - day)
    return newDate
}

export {
    calculateWeekStartDate,
}