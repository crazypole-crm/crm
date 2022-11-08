import {combine, map} from "@reatom/core";
import {hallsLoadingAtom} from "../hall/loadHalls";
import {directionsLoadingAtom} from "../direction/loadDirections";

const calendarLoadingAtom = map(combine({
    hallsLoading: hallsLoadingAtom,
    directionsLoading: directionsLoadingAtom,
}), ({hallsLoading, directionsLoading}) => hallsLoading || directionsLoading)

export {
    calendarLoadingAtom,
}