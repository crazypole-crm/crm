import { Layout } from "antd"
import { Content } from "antd/lib/layout/layout"
import { Redirect, Route, Switch } from "react-router-dom"
import { Router } from "../../core/router/router"
import styles from './AdminLayout.module.css'
import { AdminHeader } from "./header/AdminHeader"
import { Sidebar } from "./sidebar/Sidebar"


function AdminLayout() {
    return (
        <Layout>
            <AdminHeader />
            <Layout hasSider>
                <Sidebar />
                <Content className={styles.content}>
                    <Switch>
                        <Redirect exact from={Router.Admin.url()} to={Router.Dashboard.url()}/>
                        <Route exact path={[Router.Mark.url()]} >
                            <div>Mark Layout</div>
                        </Route>
                        <Route exact path={[Router.Schedule.url()]} >
                            <div>Schedule Layout</div>
                        </Route>
                        <Route exact path={[Router.User.url()]} >
                            <div>User Layout</div>
                        </Route>
                        <Route exact path={[Router.UsersList.url()]} >
                            <div>Users Layout</div>
                        </Route>
                        <Route exact path={[Router.Settings.url()]} >
                            <div>Settings Layout</div>
                        </Route>
                        <Route exact path={[Router.Mark.url()]} >
                            <div>Mark Layout</div>
                        </Route>
                        <Route exact path={[Router.Dashboard.url()]} >
                            <div>Dashboard Layout</div>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

export {
    AdminLayout,
}