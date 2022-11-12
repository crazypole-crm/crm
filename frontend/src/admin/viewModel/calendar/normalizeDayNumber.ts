

function normalizeDayNumber(date: Date): number {
    const day = date.getDay()
    if (day === 0) {
        return 6
    }
    return day - 1
}

export {
    normalizeDayNumber,
}