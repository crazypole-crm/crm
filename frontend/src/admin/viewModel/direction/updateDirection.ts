import { DirectionsApi } from "../../../api/directionsApi"
import { processStandardError } from "../../../core/error/processStandardError"
import { declareAsyncAction } from "../../../core/reatom/declareAsyncAction"
import { DirectionData } from "./DirectionData"
import { directionsActions } from "./directions"

const updateDirection = declareAsyncAction<DirectionData>(
    'updateDirection',
    (userData, store) => {
        return DirectionsApi.editDirection({
            id: userData.id,
            name: userData.name,
        })
            .then(() => {
                store.dispatch(directionsActions.updateDirection({
                    ...userData,
                }))
            })
            .catch(processStandardError)
    }
)

export {
    updateDirection,
}