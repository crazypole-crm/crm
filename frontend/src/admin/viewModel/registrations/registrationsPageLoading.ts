import {combine, map} from "@reatom/core";
import {hallsLoadingAtom} from "../hall/loadHalls";
import {directionsLoadingAtom} from "../direction/loadDirections";
import {usersLoadingAtom} from "../users/loadUsers";
import {registrationsLoadingAtom} from "./loadRegistrations";

const registrationsPageLoadingAtom = map(combine({
    hallsLoading: hallsLoadingAtom,
    directionsLoading: directionsLoadingAtom,
    userLoading: usersLoadingAtom,
    registrationsLoading: registrationsLoadingAtom,
}), ({hallsLoading, directionsLoading, userLoading, registrationsLoading}) => hallsLoading || directionsLoading || userLoading || registrationsLoading)

export {
    registrationsPageLoadingAtom,
}