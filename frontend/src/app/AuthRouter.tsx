import { useAtom } from "@reatom/react";
import {Redirect, Switch} from "react-router-dom";
import {Router} from "../core/router/router";
import { currentUserAtom } from "../currentUser/currentUser";


function AuthRouter() {
    const currentUser = useAtom(currentUserAtom)

    if (currentUser.isAuthUser) {
        return (
            <Switch>
                <Redirect exact from={Router.Auth.url()} to={Router.Admin.url()} />
            </Switch>
        )
    }

    return null
}

export {
    AuthRouter,
}