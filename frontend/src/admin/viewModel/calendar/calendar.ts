import {combine} from "@reatom/core";
import {lastLoadedPeriodAtom, trainingsLoadingAtom} from "./calendaActions/loadTrainingsForPeriod";
import {calendarSettingsAtom} from "./calendartSettings/calendarSettings";


const calendarAtom = combine({
    lastLoadedPeriodAtom,
    calendarSettingsAtom,
    trainingsLoadingAtom,
})

export {
    calendarAtom,
}