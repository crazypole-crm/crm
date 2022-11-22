import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {processStandardError} from "../../../core/error/processStandardError";
import {HallData} from "./HallData";
import {hallsActions} from "./halls";
import {HallsApi} from "../../../api/hallsApi";

const createHall = declareAsyncAction<Omit<HallData, 'id'>>('hall.create',
    (hall, store) => {
        return HallsApi.createHall(hall)
            .then(({hallId}) => {
                store.dispatch(hallsActions.updateHall({
                    id: hallId,
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