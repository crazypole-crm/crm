import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../api/calendarApi";
import {directionsActions} from "../direction/directions";
import {processStandardError} from "../../../core/error/processStandardError";
import {HallData} from "./HallData";


const saveHall = declareAsyncAction<HallData>('hall.save',
    (direction, store) => {
        return CalendarApi.saveHall(direction)
            .then(() => {
                store.dispatch(directionsActions.updateDirection(direction))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

export {
    saveHall,
}