import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {processStandardError} from "../../../core/error/processStandardError";
import {hallsActions} from "./halls";
import {HallsApi} from "../../../api/hallsApi";

const deleteHall = declareAsyncAction<string>('hall.delete',
    (hallId, store) => {
        return HallsApi.deleteHall(hallId)
            .then(() => {
                store.dispatch(hallsActions.removeHall([hallId]))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

export {
    deleteHall
}