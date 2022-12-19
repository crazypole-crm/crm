import {useAction, useAtom} from "@reatom/react";
import {useEffect, useLayoutEffect} from "react";
import {withRouter} from "react-router-dom";
import {Preloader} from "../common/preloader/Preloader";
import {initRouterHistory, setOnCalendarPageOpened} from "../core/router/router";
import {initUserDataAction} from "../currentUser/actions/initUser";
import {App} from "./App";
import {isLoadingAppAtom} from "./isAppLoading";
import {calendarPageOpened} from "../admin/viewModel/calendar/calendaActions/loadTrainingsForPeriod";

const AppWrapper = withRouter(({history}) => {
    const isLoadingApp = useAtom(isLoadingAppAtom)
    const handleInitUserData = useAction(initUserDataAction)
    const handleCalendarPageLoaded = useAction(calendarPageOpened)

    useLayoutEffect(() => {
        initRouterHistory(history)
        setOnCalendarPageOpened(handleCalendarPageLoaded)
    }, [history, handleCalendarPageLoaded])

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