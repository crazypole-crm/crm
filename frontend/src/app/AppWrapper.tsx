import { useAction, useAtom } from "@reatom/react";
import { useLayoutEffect } from "react";
import { setI18n, useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Preloader } from "../common/preloader/Preloader";
import { initRouterHistory } from "../core/router/router";
import { setTranslationFunction } from "../i18n/i18n_get";
import { App } from "./App";
import { isLoadingAppAtom, setIsLoadingApp } from "./isAppLoading";

const AppWrapper = withRouter(({history}) => {
    const {t, i18n} = useTranslation()
    const isLoadingApp = useAtom(isLoadingAppAtom)
    const handleSetIsLoadingApp = useAction(setIsLoadingApp)

    useLayoutEffect(() => {
        initRouterHistory(history)
        setTimeout(() => {
          handleSetIsLoadingApp(false)
        }, 700)
    }, [history, handleSetIsLoadingApp])

    useLayoutEffect(() => {
        setTranslationFunction(t)
        setI18n(i18n)
    }, [t, i18n])

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