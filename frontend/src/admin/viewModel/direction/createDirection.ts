import { DirectionsApi } from "../../../api/directionsApi"
import { processStandardError } from "../../../core/error/processStandardError"
import { declareAsyncAction } from "../../../core/reatom/declareAsyncAction"
import { DirectionData } from "./DirectionData"
import { directionsActions } from "./directions"

const createDirection = declareAsyncAction<Omit<DirectionData, 'id'>>(
    'createDirection',
    (directionData, store) => {
        return DirectionsApi.createDirection(directionData)
            .then(({id}) => {
                store.dispatch(directionsActions.updateDirection({
                    ...directionData,
                    id
                }))
            })
            .catch(processStandardError)
    }
)

export {
    createDirection,
}