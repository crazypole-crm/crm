import {useAtom} from "@reatom/react"
import {Redirect, Route, Switch} from "react-router-dom"
import {Router} from "../../core/router/router"
import {currentUserAtom} from "../../currentUser/currentUser"
import styles from './AdminLayout.module.css'
import {AdminHeader} from "./header/AdminHeader"
import {Sidebar} from "./sidebar/Sidebar"
import {UsersLayout} from "./users/UsersLayout"
import {EditUserPopup} from "./users/editUserPopup/EditUserPopup";
import {ScheduleLayoutWrapper} from "./schedule/ScheduleLayoutWrapper";
import {EditTrainingPopup} from "./schedule/calendar/editTrainingPopup/EditTrainingPopup";
import {CalendarSettingsPopup} from "./schedule/calendar/calendarSettins/CalendarSettingsPopup";
import {ViewUserPopup} from "./users/viewUsersPopup/ViewUserPopup";
import {ReplaceTrainerPopup} from "./schedule/calendar/replaceTrainerPopup/ReplaceTrainerPopup";
import {MoveTrainingPopup} from "./schedule/calendar/moveTrainingPopup/MoveTrainingPopup";
import {TrainingActionPopup} from "./schedule/calendar/trainingActionPopup/TrainingActionPopup";
import {TrainingClientsPopup} from "./schedule/calendar/trainingClientsPopup/TrainingClientsPopup";
import { DirectionsLayout } from "./directions/DirectionsLayout"
import {RecordToTrainingPopup} from "./schedule/calendar/recordToTrainingPopup/RecordToTrainingPopup";
import { EditDirectionPopup } from "./directions/directionsPopups/EditDirectionPopup"
import { DeleteDirectionsPopup } from "./directions/directionsPopups/DeleteDirectionsPopup"
import { HallsLayout } from "./halls/HallsLayout"
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

    if (!currentUser.isAuthUser) {
        return <Redirect to={Router.Auth.url()} />
    }

    return (
        <div className={styles.layout}>
            <AdminHeader />
            <div className={styles.contentRow}>
                <Sidebar />
                <div className={styles.content}>
                    <Switch>
                        <Route exact path={[Router.Schedule.url()]} >
                            <ScheduleLayoutWrapper />
                        </Route>
                        <Route exact path={[Router.UsersList.url()]} >
                            <UsersLayout/>
                        </Route>
                        <Route exact path={[Router.Directions.url()]} >
                            <DirectionsLayout />
                        </Route>
                        <Route exact path={[Router.Halls.url()]} >
                            <HallsLayout />
                        </Route>
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