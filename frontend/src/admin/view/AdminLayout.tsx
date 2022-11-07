import { useAtom } from "@reatom/react"
import { Layout } from "antd"
import { Content } from "antd/lib/layout/layout"
import { Redirect, Route, Switch } from "react-router-dom"
import { Router } from "../../core/router/router"
import { currentUserAtom } from "../../currentUser/currentUser"
import styles from './AdminLayout.module.css'
import { AdminHeader } from "./header/AdminHeader"
import { Sidebar } from "./sidebar/Sidebar"
import { UsersLayout } from "./users/UsersLayout"


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
                            <div>Schedule Layout</div>
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
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export {
    AdminLayout,
}