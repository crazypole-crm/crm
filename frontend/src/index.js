import {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {context} from '@reatom/react';
import {combine, createStore,} from "@reatom/core";
import "antd/dist/antd.css";
import "./index.css";
import i18n from "./i18n";
import {BrowserRouter as Router} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {AppWrapper} from "./app/AppWrapper";
import { isLoadingAppAtom } from './app/isAppLoading';
import { currentUserAtom } from './currentUser/currentUser';
import {initExternalLayer} from "./common/layers/externalLayers";
import {usersAtom} from "./admin/viewModel/users/users";
import {directionsAtom} from "./admin/viewModel/direction/directions";
import {hallsAtom} from "./admin/viewModel/hall/halls";
import 'moment/locale/ru';
import moment from "moment";

const store = createStore(
  combine({
    isLoadingAppAtom,
    currentUserAtom,
    usersAtom,
    directionsAtom,
    hallsAtom
  })
);

moment.locale('ru-RU', {
    week: {
        dow: 1 /// Date offset
    }
});

ReactDOM.render(
  <Suspense fallback="loading">
    <context.Provider value={store}>
        <Router>
            <AppWrapper />
        </Router>
    </context.Provider>
  </Suspense>,
    document.getElementById('root')
);

initExternalLayer('popup')

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
