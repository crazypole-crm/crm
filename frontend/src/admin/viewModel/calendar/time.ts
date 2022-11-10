
function compareTime(time1: Time, time2: Time) {
    if (time1.hour === time2.hour) {
        return time1.minutes - time2.minutes
    }
    return time1.hour - time2.hour
}

export type Time = {
    hour: number,
    minutes: number,
}

export {
    compareTime,
}