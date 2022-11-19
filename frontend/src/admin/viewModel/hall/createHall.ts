import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../api/calendarApi";
import {processStandardError} from "../../../core/error/processStandardError";
import {HallData} from "./HallData";
import {hallsActions} from "./halls";

const createHall = declareAsyncAction<Omit<HallData, 'id'>>('hall.create',
    (hall, store) => {
        return CalendarApi.createHall(hall)
            .then(({id}) => {
                store.dispatch(hallsActions.updateHall({
                    id,
                    ...hall
                }))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

export {
    createHall,
}