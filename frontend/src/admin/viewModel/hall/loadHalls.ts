import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../api/calendarApi";
import {processStandardError} from "../../../core/error/processStandardError";
import {hallsActions} from "./halls";
import {declareAtom} from "@reatom/core";

const loadHalls = declareAsyncAction<void>('directions.load',
    (_, store) => {
        return CalendarApi.getHalls()
            .then(halls => {
                store.dispatch(hallsActions.updateHalls(halls))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

const hallsLoadingAtom = declareAtom('halls.loading', true, on => [
    on(loadHalls, () => true),
    on(loadHalls.done, () => false),
    on(loadHalls.fail, () => false),
])

export {
    loadHalls,
    hallsLoadingAtom,
}