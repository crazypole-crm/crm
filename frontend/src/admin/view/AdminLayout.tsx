import {useAction, useAtom} from "@reatom/react"
import {Redirect, Route, Switch} from "react-router-dom"
import {Router} from "../../core/router/router"
import {currentUserAtom} from "../../currentUser/currentUser"
import styles from './AdminLayout.module.css'
import {AdminHeader} from "./header/AdminHeader"
import {Sidebar} from "./sidebar/Sidebar"
import {UsersLayout} from "./users/UsersLayout"
import {editUserPopupActions, editUserPopupAtom} from "../viewModel/editUserPopup/editUserPopup";
import {useAtomWithSelector} from "../../core/reatom/useAtomWithSelector";
import {PopupPortal} from "../../common/portal/PopupPortal";
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

function PopupsLayout() {
    return (
        <>
            <EditUserPopup />
            <EditTrainingPopup />
            <CalendarSettingsPopup />
            <ViewUserPopup />
            <ReplaceTrainerPopup />
            <MoveTrainingPopup />
            <TrainingActionPopup />
            <TrainingClientsPopup />
            <RecordToTrainingPopup />
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