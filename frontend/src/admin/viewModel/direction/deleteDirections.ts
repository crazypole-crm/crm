import { DirectionsApi } from "../../../api/directionsApi"
import { processStandardError } from "../../../core/error/processStandardError"
import { declareAsyncAction } from "../../../core/reatom/declareAsyncAction"
import { directionsActions } from "./directions"

const deleteDirections = declareAsyncAction<string[]>(
    'deleteDirections',
    (directionsIds, store) => {
        return DirectionsApi.deleteDirections(directionsIds)
            .then(() => {
                store.dispatch(directionsActions.removeDirections(directionsIds))
            })
            .catch(processStandardError)
    }
)

export {
    deleteDirections,
}