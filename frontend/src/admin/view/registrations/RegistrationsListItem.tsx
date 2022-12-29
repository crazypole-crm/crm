import { useAction, useAtom } from "@reatom/react"
import { trainingActionPopupActions } from "../../viewModel/calendar/trainingActionPopup/trainingActionPopup"
import {TrainingData, TrainingDate} from "../../viewModel/calendar/TrainingData"
import { directionsAtom } from "../../viewModel/direction/directions"
import { usersAtom } from "../../viewModel/users/users"
import { getDurationString, getTrainerName } from "../schedule/calendar/weekCalendar/cells/TrainingCalendarCell"
import styles from './RegistrationsLayout.module.css'
import {normalizeDate} from "../users/table/userTableDataConvert";

type RegistrationsListItemProps = {
    trainingData: TrainingData
}

function getDateString(date: TrainingDate) {
    return `${normalizeDate(date.date)}.${normalizeDate(date.month)}.${normalizeDate(date.year)}`
}

function RegistrationsListItem({trainingData}: RegistrationsListItemProps) {
    const users = useAtom(usersAtom)
    const directions = useAtom(directionsAtom)
    const handleOpenTrainingActionPopup = useAction(trainingActionPopupActions.open)

    const trainer = users[trainingData.trainerId]
    const direction = directions[trainingData.directionId]

    const onUnsubscribeTraining = () => {
        handleOpenTrainingActionPopup({
            mode: 'unsubscribe',
            ...trainingData,
        })
    }

    return (
        <div className={styles.listItem} onClick={onUnsubscribeTraining}>
            <div className={styles.directionTitle}>
                {direction.name}
            </div>
            <div className={styles.time}>
                {getDateString(trainingData.date)}
            </div>
            <div className={styles.time}>
                {getDurationString(trainingData.timeStart, trainingData.timeEnd)}
            </div>
            <div className={styles.trainerName}>
                {getTrainerName(trainer.firstName, trainer.lastName)}
            </div>
            {(trainingData.isCanceled) && <span className={styles.cancelWarning}>Отмена занятия</span>}
        </div>
    )
}

export {
    RegistrationsListItem
}