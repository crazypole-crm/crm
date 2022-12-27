import { useAction, useAtom } from "@reatom/react"
import { trainingActionPopupActions } from "../../viewModel/calendar/trainingActionPopup/trainingActionPopup"
import { directionsAtom } from "../../viewModel/direction/directions"
import { UserRegistrationData } from "../../viewModel/registrations/UserRegistrationData"
import { usersAtom } from "../../viewModel/users/users"
import { getDurationString, getTrainerName } from "../schedule/calendar/weekCalendar/cells/TrainingCalendarCell"
import styles from './RegistrationsLayout.module.css'

type RegistrationsListItemProps = {
    registrationData: UserRegistrationData
}

function RegistrationsListItem({registrationData}: RegistrationsListItemProps) {
    const users = useAtom(usersAtom)
    const directions = useAtom(directionsAtom)
    const handleOpenTrainingActionPopup = useAction(trainingActionPopupActions.open)

    const trainer = users[registrationData.trainingData.trainerId]
    const direction = directions[registrationData.trainingData.directionId]

    const onUnsubscribeTraining = () => {
        handleOpenTrainingActionPopup({
            mode: 'unsubscribe',
            registrationId: registrationData.id,
            ...registrationData.trainingData,
        })
    }

    return (
        <div className={styles.listItem} onClick={onUnsubscribeTraining}>
            <div className={styles.directionTitle}>
                {direction.name}
            </div>
            <div className={styles.time}>
                {getDurationString(registrationData.trainingData.timeStart, registrationData.trainingData.timeEnd)}
            </div>
            <div className={styles.trainerName}>
                {getTrainerName(trainer.firstName, trainer.lastName)}
            </div>
            {(registrationData.trainingData.isCanceled) && <span className={styles.cancelWarning}>Отмена занятия</span>}
        </div>
    )
}

export {
    RegistrationsListItem
}