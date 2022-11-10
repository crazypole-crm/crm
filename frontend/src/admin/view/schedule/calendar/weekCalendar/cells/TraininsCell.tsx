import {CalendarCell} from "../../common/CalendarCell";
import styles from "./TrainingCell.module.css";
import {TrainingData} from "../../../../../viewModel/calendar/TrainingData";
import {useAtom} from "@reatom/react";
import {directionsAtom} from "../../../../../viewModel/direction/directions";
import {Time} from "../../../../../viewModel/calendar/time";
import {normalizeDate} from "../../../../users/table/userTableDataConvert";
import {usersAtom} from "../../../../../viewModel/users/users";
import {hallsAtom} from "../../../../../viewModel/hall/halls";
import {AddPlusIcon} from "../../../../../../icons/AddPlusIcon";

type TrainingCalendarCellProps = {
    trainingData: TrainingData,
    time: Time,
}

function getDurationString(timeStart: Time, timeEnd: Time) {
    return `${normalizeDate(timeStart.hour)}:${normalizeDate(timeStart.minutes)} - ${normalizeDate(timeEnd.hour)}:${normalizeDate(timeEnd.minutes)}`
}

function getTrainerName(firstName?: string, lastName?: string) {
    if (!firstName || !lastName) {
        return ''
    }
    return `${firstName} ${lastName[0]}.`
}

function getFreePlaces(hallCapacity: number, usersCount: number) {
    const freePlaces = Math.max(hallCapacity - usersCount, 0)
    if (freePlaces > 0) {
        return `Свободно ${freePlaces} места`
    }
    return 'Все места заняты'
}

function TrainingCalendarCell({
    trainingData,
    time,
}: TrainingCalendarCellProps) {
    const directions = useAtom(directionsAtom)
    const halls = useAtom(hallsAtom)
    const users = useAtom(usersAtom)

    const trainer = users[trainingData.trainerId]
    const hall = halls[trainingData.hallId]

    const onAdd = () => {
        console.log('add')
    }

    return (
        <CalendarCell className={styles.cell}>
            <>
                <div className={styles.trainingInfo}>
                    <div className={styles.directionTitle}>
                        {directions[trainingData.directionId].name}
                    </div>
                    <div className={styles.time}>
                        {getDurationString(trainingData.timeStart, trainingData.timeEnd)}
                    </div>
                    <div className={styles.freePlaces}>
                        {getFreePlaces(hall.capacity, trainingData.clients.length)}
                    </div>
                    <div className={styles.trainerName}>
                        {getTrainerName(trainer.firstName, trainer.lastName)}
                    </div>
                </div>
                <div className={styles.plus} onClick={onAdd}>
                    <AddPlusIcon className={styles.plusIcon}/>
                </div>
            </>
        </CalendarCell>
    )
}

export {
    TrainingCalendarCell,
}