import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../api/calendarApi";
import {directionsActions} from "./directions";
import {processStandardError} from "../../../core/error/processStandardError";
import {declareAtom} from "@reatom/core";


const loadDirections = declareAsyncAction<void>('directions.load',
    (_, store) => {
        return CalendarApi.getDirections()
            .then(directions => {
                store.dispatch(directionsActions.updateDirections(directions))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

const directionsLoadingAtom = declareAtom('directions.loading', true, on => [
    on(loadDirections, () => true),
    on(loadDirections.done, () => false),
    on(loadDirections.fail, () => false),
])

export {
    loadDirections,
    directionsLoadingAtom,
}