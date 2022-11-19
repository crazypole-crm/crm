import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {DirectionData} from "./DirectionData";
import {CalendarApi} from "../../../api/calendarApi";
import {directionsActions} from "./directions";
import {processStandardError} from "../../../core/error/processStandardError";


const deleteDirection = declareAsyncAction<string>('directions.delete',
    (directionId, store) => {
        return CalendarApi.deleteDirection(directionId)
            .then(() => {
                store.dispatch(directionsActions.removeDirection([directionId]))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

export {
    deleteDirection,
}