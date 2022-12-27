import {useAction, useAtom} from "@reatom/react";
import {loadDirections} from "../../viewModel/direction/loadDirections";
import {loadHalls} from "../../viewModel/hall/loadHalls";
import {useEffect} from "react";
import {calendarLoadingAtom} from "../../viewModel/calendar/calendarLoading";
import styles from './ScheduleLayoutWrapper.module.css'
import {Preloader} from "../../../common/preloader/Preloader";
import {Calendar} from "./Calendar";
import {loadAllTrainers, loadAllUsersData} from "../../viewModel/users/loadUsers";
import {authorizedCurrentUser} from "../../../currentUser/currentUser";

function ScheduleLayout() {
    return (
        <div className={styles.calendarLayout}>
            <Calendar />
        </div>
    )
}

function ScheduleLayoutWrapper() {
    const isClient = useAtom(authorizedCurrentUser, x => x.role === 'client', [])
    const calendarLoading = useAtom(calendarLoadingAtom)
    const handleLoadDirection = useAction(loadDirections)
    const handleLoadHalls = useAction(loadHalls)
    const handleLoadAllTrainers = useAction(loadAllTrainers)
    const handleLoadAllUsers = useAction(loadAllUsersData)

    useEffect(() => {
        handleLoadDirection()
        handleLoadHalls()
        isClient
            ? handleLoadAllTrainers()
            : handleLoadAllUsers()
    }, [handleLoadDirection, isClient, handleLoadHalls, handleLoadAllTrainers, handleLoadAllUsers])

    return (
        <div className={styles.calendarLayoutWrapper}>
            {
                calendarLoading
                    ? <Preloader size={'large'} />
                    : <ScheduleLayout />
            }
        </div>
    )
}

export {
    ScheduleLayoutWrapper,
}