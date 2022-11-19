import {TrainingDate} from "./TrainingData";
import {Time} from "./time";

function convertTrainingDataToDate(trainingDate: TrainingDate, time: Time) {
    const date = new Date()
    date.setDate(trainingDate.date)
    date.setFullYear(trainingDate.year)
    date.setMonth(trainingDate.month)
    date.setHours(time.hour)
    date.setMinutes(time.minutes)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date
}

export {
    convertTrainingDataToDate,
}