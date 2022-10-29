import {Redirect, Switch} from "react-router-dom";
import {Router} from "../core/router/router";


function AuthRouter() {
    const isAuth = false

    if (!isAuth) {
        return <Redirect to={Router.Auth.url()} />
    }

    return (
        <Switch>
            <Redirect exact from={Router.Auth.url()} to={Router.Admin.url()} />
        </Switch>
    )
}

export {
    AuthRouter,
}