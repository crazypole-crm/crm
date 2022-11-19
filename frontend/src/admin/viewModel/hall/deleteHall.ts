import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../api/calendarApi";
import {directionsActions} from "../direction/directions";
import {processStandardError} from "../../../core/error/processStandardError";

const deleteHall = declareAsyncAction<string>('hall.delete',
    (hallId, store) => {
        return CalendarApi.deleteHall(hallId)
            .then(() => {
                store.dispatch(directionsActions.removeDirection([hallId]))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

export {
    deleteHall
}