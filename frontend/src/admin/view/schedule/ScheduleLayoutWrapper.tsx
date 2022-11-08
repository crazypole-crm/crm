import {useAction, useAtom} from "@reatom/react";
import {loadDirections} from "../../viewModel/direction/loadDirections";
import {loadHalls} from "../../viewModel/hall/loadHalls";
import {useEffect} from "react";
import {calendarLoadingAtom} from "../../viewModel/calendar/calendarLoading";
import styles from './ScheduleLayoutWrapper.module.css'
import {Preloader} from "../../../common/preloader/Preloader";

function ScheduleLayout() {

    return (
        <div>Schedule Layout</div>
    )
}

function ScheduleLayoutWrapper() {
    const calendarLoading = useAtom(calendarLoadingAtom)
    const handleLoadDirection = useAction(loadDirections)
    const handleLoadHalls = useAction(loadHalls)

    useEffect(() => {
        handleLoadDirection()
        handleLoadHalls()
    }, [handleLoadDirection, handleLoadHalls])

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