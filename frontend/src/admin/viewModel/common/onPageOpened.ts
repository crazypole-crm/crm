import {declareAction} from "@reatom/core"
import {usersActions} from "../users/users";
import {hallsActions} from "../hall/halls";
import {directionsActions} from "../direction/directions";
import { registrationsActions } from "../registrations/registrations";


const calendarPageOpened = declareAction('calendarPageOpened')

const usersPageOpened = declareAction('usersPageOpened', (_, store) => {
    store.dispatch(usersActions.clearUsers())
})

const hallsPageOpened = declareAction('hallsPageOpened', (_, store) => {
    store.dispatch(hallsActions.clearHalls())
})

const directionsPageOpened = declareAction('directionsPageOpened', (_, store) => {
    store.dispatch(directionsActions.clearDirections())
})

const registrationsPageOpened = declareAction('registrationsPageOpened', (_, store) => {
    store.dispatch(registrationsActions.clearRegistrations())
})

export {
    calendarPageOpened,
    usersPageOpened,
    hallsPageOpened,
    directionsPageOpened,
    registrationsPageOpened
}