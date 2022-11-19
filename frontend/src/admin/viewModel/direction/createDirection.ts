import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../api/calendarApi";
import {directionsActions} from "./directions";
import {processStandardError} from "../../../core/error/processStandardError";
import {DirectionData} from "./DirectionData";


const createDirection = declareAsyncAction<Omit<DirectionData, 'id'>>('directions.create',
    (direction, store) => {
        return CalendarApi.createDirection(direction)
            .then(({id}) => {
                store.dispatch(directionsActions.updateDirection({
                    id,
                    ...direction
                }))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

export {
    createDirection
}