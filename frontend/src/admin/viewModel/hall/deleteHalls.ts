import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {processStandardError} from "../../../core/error/processStandardError";
import {hallsActions} from "./halls";
import {HallsApi} from "../../../api/hallsApi";

const deleteHalls = declareAsyncAction<string[]>('hall.delete',
    (hallIds, store) => {
        return HallsApi.deleteHalls(hallIds)
            .then(() => {
                store.dispatch(hallsActions.removeHall(hallIds))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

export {
    deleteHalls
}