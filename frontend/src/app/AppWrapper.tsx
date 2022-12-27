import {useAction, useAtom} from "@reatom/react";
import {useEffect, useLayoutEffect} from "react";
import {withRouter} from "react-router-dom";
import {Preloader} from "../common/preloader/Preloader";
import {
    initRouterHistory,
    setOnCalendarPageOpened,
    setOnDirectionsPageOpened,
    setOnHallsPageOpened,
    setOnUsersPageOpened,
    setOnRegistrationsPageOpened
} from "../core/router/router";
import {initUserDataAction} from "../currentUser/actions/initUser";
import {App} from "./App";
import {isLoadingAppAtom} from "./isAppLoading";
import {calendarPageOpened, registrationsPageOpened} from "../admin/viewModel/common/onPageOpened";
import {directionsPageOpened, hallsPageOpened, usersPageOpened} from "../admin/viewModel/common/onPageOpened";

const AppWrapper = withRouter(({history}) => {
    const isLoadingApp = useAtom(isLoadingAppAtom)
    const handleInitUserData = useAction(initUserDataAction)
    const handleCalendarPageLoaded = useAction(calendarPageOpened)
    const handleUsersPageLoaded = useAction(usersPageOpened)
    const handleHallsPageLoaded = useAction(hallsPageOpened)
    const handleDirectionsPageLoaded = useAction(directionsPageOpened)
    const handleRegistrationsPageLoaded = useAction(registrationsPageOpened)

    useLayoutEffect(() => {
        initRouterHistory(history)
        setOnCalendarPageOpened(handleCalendarPageLoaded)
        setOnUsersPageOpened(handleUsersPageLoaded)
        setOnHallsPageOpened(handleHallsPageLoaded)
        setOnDirectionsPageOpened(handleDirectionsPageLoaded)
        setOnRegistrationsPageOpened(handleRegistrationsPageLoaded)
    }, [history, handleCalendarPageLoaded, handleRegistrationsPageLoaded, handleUsersPageLoaded, handleHallsPageLoaded, handleDirectionsPageLoaded])

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