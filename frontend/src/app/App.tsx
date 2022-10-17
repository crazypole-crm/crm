import { Redirect, Route, Switch } from "react-router-dom";
import { AdminLayout } from "../admin/view/AdminLayout";
import { AuthLayout } from "../auth/view/AuthLayout";
import { Router } from "../core/router/router";
import { AuthRouter } from "./AuthRouter";

function App() {
    return (
        <>
            <AuthRouter />
            <Switch>
                <Redirect exact from={'/'} to={Router.Auth.url()}/>
                <Route exact path={[Router.Auth.url()]} >
                    <AuthLayout />
                </Route>
                <Route path={[Router.Admin.url()]}>
                    <AdminLayout />
                </Route>
                <Redirect to={Router.Admin.url()} />
            </Switch>
        </>
    )
}

export {
    App,
}