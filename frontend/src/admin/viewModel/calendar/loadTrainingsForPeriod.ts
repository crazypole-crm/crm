import {TrainingData} from "./TrainingData";
import {CalendarApi} from "../../../api/calendarApi";


async function loadTrainingsForPeriod(startDate: Date, endDate: Date, setTrainings: (trainings: TrainingData[]) => void) {
    CalendarApi.getTrainingsForPeriod(startDate, endDate)
        .then((trainings) => {
            setTrainings(trainings)
        })
}

export {
    loadTrainingsForPeriod
}