import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {processStandardError} from "../../../core/error/processStandardError";
import {HallData} from "./HallData";
import {hallsActions} from "./halls";
import {HallsApi} from "../../../api/hallsApi";

const saveHall = declareAsyncAction<HallData>('hall.save',
    (direction, store) => {
        return HallsApi.saveHall(direction)
            .then(() => {
                store.dispatch(hallsActions.updateHall(direction))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

export {
    saveHall,
}