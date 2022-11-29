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

function convertDateToTrainingData(date: Date): {trainingDate: TrainingDate, time: Time} {
    return {
        trainingDate: {
            date: date.getDate(),
            year: date.getFullYear(),
            month: date.getMonth(),
        },
        time: {
            minutes: date.getMinutes(),
            hour: date.getHours(),
        }
    }
}

export {
    convertTrainingDataToDate,
    convertDateToTrainingData,
}