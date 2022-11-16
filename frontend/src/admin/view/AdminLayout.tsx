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

function PopupsLayout() {
    const editUserPopupOpened = useAtomWithSelector(editUserPopupAtom, x => x.opened)

    const handleCloseEditUserPopup = useAction(editUserPopupActions.close)

    return (
        <>
            <PopupPortal binding={<EditUserPopup/>} show={editUserPopupOpened} close={() => handleCloseEditUserPopup()} />
            <EditTrainingPopup />
            <CalendarSettingsPopup />
            <ViewUserPopup />
            <ReplaceTrainerPopup />
            <MoveTrainingPopup />
            <TrainingActionPopup />
            <TrainingClientsPopup />
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
                        <Redirect exact from={Router.Admin.url()} to={Router.Dashboard.url()}/>
                        <Route exact path={[Router.Mark.url()]} >
                            <div>Mark Layout</div>
                        </Route>
                        <Route exact path={[Router.Schedule.url()]} >
                            <ScheduleLayoutWrapper />
                        </Route>
                        <Route exact path={[Router.User.url(':userId')]} >
                            <div>User Layout</div>
                        </Route>
                        <Route exact path={[Router.UsersList.url()]} >
                            <UsersLayout/>
                        </Route>
                        <Route exact path={[Router.Settings.url()]} >
                            <div>Settings Layout</div>
                        </Route>
                        <Route exact path={[Router.Dashboard.url()]} >
                            <div>Dashboard Layout</div>
                        </Route>
                        <Route exact path={[Router.Directions.url()]} >
                            <DirectionsLayout />
                        </Route>
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