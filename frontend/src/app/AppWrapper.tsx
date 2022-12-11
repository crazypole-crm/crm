import {useAction, useAtom} from "@reatom/react";
import {useEffect, useLayoutEffect} from "react";
import {withRouter} from "react-router-dom";
import {Preloader} from "../common/preloader/Preloader";
import {initRouterHistory} from "../core/router/router";
import {initUserDataAction} from "../currentUser/actions/initUser";
import {App} from "./App";
import {isLoadingAppAtom} from "./isAppLoading";

const AppWrapper = withRouter(({history}) => {
    const isLoadingApp = useAtom(isLoadingAppAtom)
    const handleInitUserData = useAction(initUserDataAction)

    useLayoutEffect(() => {
        initRouterHistory(history)
    }, [history])

    useEffect(() => {
      handleInitUserData()
    }, [handleInitUserData])

    return (
      <div>
        {
          isLoadingApp
            ? <Preloader size="large"/>
            : <App/>
        }
      </div>
    );
})

export {
    AppWrapper,
}