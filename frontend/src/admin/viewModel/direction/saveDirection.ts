import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {DirectionData} from "./DirectionData";
import {CalendarApi} from "../../../api/calendarApi";
import {directionsActions} from "./directions";
import {processStandardError} from "../../../core/error/processStandardError";


const saveDirection = declareAsyncAction<DirectionData>('directions.save',
    (direction, store) => {
        return CalendarApi.saveDirection(direction)
            .then(() => {
                store.dispatch(directionsActions.updateDirection(direction))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

export {
    saveDirection,
}