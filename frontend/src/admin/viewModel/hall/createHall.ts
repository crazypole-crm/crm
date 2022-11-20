import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {processStandardError} from "../../../core/error/processStandardError";
import {HallData} from "./HallData";
import {hallsActions} from "./halls";
import {HallsApi} from "../../../api/hallsApi";

const createHall = declareAsyncAction<Omit<HallData, 'id'>>('hall.create',
    (hall, store) => {
        return HallsApi.createHall(hall)
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