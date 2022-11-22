import { DirectionsApi } from "../../../api/directionsApi"
import { processStandardError } from "../../../core/error/processStandardError"
import { declareAsyncAction } from "../../../core/reatom/declareAsyncAction"
import { DirectionData } from "./DirectionData"
import { directionsActions } from "./directions"

const updateDirection = declareAsyncAction<DirectionData>(
    'updateDirection',
    (directionData, store) => {
        return DirectionsApi.editDirection({
            id: directionData.id,
            name: directionData.name,
        })
            .then(() => {
                store.dispatch(directionsActions.updateDirection({
                    ...directionData,
                }))
            })
            .catch(processStandardError)
    }
)

export {
    updateDirection,
}