import styles from './WeekCalendar.module.css'
import {WeekCalendarHeader} from "./calendar/weekCalendar/WeekCalendarHeader";
import {WeekCalendarGrid} from "./calendar/weekCalendar/WeekCalendarGrid";
import { Time } from '../../viewModel/calendar/time';
import {Preloader} from "../../../common/preloader/Preloader";
import {TrainingData} from "../../viewModel/calendar/TrainingData";

type WeekCalendarProps = {
    weekStartDate: Date,
    weekLength: 7 | 5 | 1,
    timeStep?: Time,
    startTime?: Time,
    endTime?: Time,
    loading: boolean,
    trainings: TrainingData[],
}

function WeekCalendar({
    weekStartDate,
    weekLength,
    timeStep = {
        hour: 1,
        minutes: 0,
    },
    startTime = {
        hour: 6,
        minutes: 0
    },
    endTime = {
        hour: 22,
        minutes: 0,
    },
    loading,
    trainings,
}: WeekCalendarProps) {

    return (
        <div className={styles.flexContainer}>
            <WeekCalendarHeader
                weekStartDate={weekStartDate}
                weekLength={weekLength}
                selectedDate={new Date()}
            />
            <div className={styles.gridWrapper}>
                {
                    loading
                        ? <Preloader />
                        : <WeekCalendarGrid
                            timeStep={timeStep}
                            startTime={startTime}
                            endTime={endTime}
                            weekLength={weekLength}
                            trainings={trainings}
                            weekStartDate={weekStartDate}
                        />
                }
            </div>
        </div>
    )
}

export {
    WeekCalendar
}