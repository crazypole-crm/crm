import { Redirect, Route, Switch } from "react-router-dom";
import { AdminLayout } from "../admin/view/AdminLayout";
import { AuthLayout } from "../auth/view/AuthLayout";
import { Router } from "../core/router/router";

function App() {
    return (
        <>
            <Switch>
                <Redirect exact from={'/'} to={Router.Auth.url()}/>
                <Route exact path={[Router.Auth.url()]} >
                    <AuthLayout />
                </Route>
                <Route path={[Router.Admin.url()]}>
                    <AdminLayout />
                </Route>
            </Switch>
        </>
    )
}

export {
    App,
}