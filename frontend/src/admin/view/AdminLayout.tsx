import {useAtom} from "@reatom/react"
import {Redirect, Route, Switch} from "react-router-dom"
import {adminRoutes, clientRoutes, Router} from "../../core/router/router"
import {authorizedCurrentUser, currentUserAtom} from "../../currentUser/currentUser"
import styles from './AdminLayout.module.css'
import {AdminHeader} from "./header/AdminHeader"
import {Sidebar} from "./sidebar/Sidebar"
import {EditUserPopup} from "./users/editUserPopup/EditUserPopup";
import {EditTrainingPopup} from "./schedule/calendar/editTrainingPopup/EditTrainingPopup";
import {CalendarSettingsPopup} from "./schedule/calendar/calendarSettins/CalendarSettingsPopup";
import {ViewUserPopup} from "./users/viewUsersPopup/ViewUserPopup";
import {ReplaceTrainerPopup} from "./schedule/calendar/replaceTrainerPopup/ReplaceTrainerPopup";
import {MoveTrainingPopup} from "./schedule/calendar/moveTrainingPopup/MoveTrainingPopup";
import {TrainingActionPopup} from "./schedule/calendar/trainingActionPopup/TrainingActionPopup";
import {TrainingClientsPopup} from "./schedule/calendar/trainingClientsPopup/TrainingClientsPopup";
import {RecordToTrainingPopup} from "./schedule/calendar/recordToTrainingPopup/RecordToTrainingPopup";
import { EditDirectionPopup } from "./directions/directionsPopups/EditDirectionPopup"
import { DeleteDirectionsPopup } from "./directions/directionsPopups/DeleteDirectionsPopup"
import { EditHallPopup } from "./halls/hallsPopups/EditHallPopup"
import { DeleteHallsPopup } from "./halls/hallsPopups/DeleteHallsPopup"
import { EditUserPasswordPopup } from "./users/editUserPopup/EditUserPasswordPopup"

function PopupsLayout() {
    return (
        <>
            <EditUserPopup />
            <EditUserPasswordPopup />
            <EditTrainingPopup />
            <CalendarSettingsPopup />
            <ViewUserPopup />
            <ReplaceTrainerPopup />
            <MoveTrainingPopup />
            <TrainingActionPopup />
            <TrainingClientsPopup />
            <RecordToTrainingPopup />
            <EditDirectionPopup />
            <DeleteDirectionsPopup />
            <EditHallPopup />
            <DeleteHallsPopup />
        </>
    )
}

function AdminLayout() {
    const currentUser = useAtom(currentUserAtom)
    const authorizedUser = useAtom(authorizedCurrentUser)

    if (!currentUser.isAuthUser) {
        return <Redirect to={Router.Auth.url()} />
    }

    return (
        <div className={styles.layout}>
            <AdminHeader />
            <div className={styles.contentRow}>
                {authorizedUser.role !== 'client' && <Sidebar/>}
                <div className={styles.content}>
                    <Switch>
                        {authorizedUser.role !== 'client'
                        ? adminRoutes.map(route =>
                            <Route exact path={[route.path]} component={route.component}/>
                        )
                        : clientRoutes.map(route =>
                            <Route exact path={[route.path]} component={route.component}/>
                        )}
                        <Redirect to={Router.Schedule.url()}/>
                    </Switch>
                </div>
            </div>
            <PopupsLayout />
        </div>
    )
}

export {
    AdminLayout,
}