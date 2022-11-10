import {combine, map} from "@reatom/core";
import {hallsLoadingAtom} from "../hall/loadHalls";
import {directionsLoadingAtom} from "../direction/loadDirections";
import {usersLoadingAtom} from "../users/loadUsers";

const calendarLoadingAtom = map(combine({
    hallsLoading: hallsLoadingAtom,
    directionsLoading: directionsLoadingAtom,
    userLoading: usersLoadingAtom,
}), ({hallsLoading, directionsLoading, userLoading}) => hallsLoading || directionsLoading || userLoading)

export {
    calendarLoadingAtom,
}