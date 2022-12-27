import {DirectionsApi} from "../../../api/directionsApi"
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction"
import {DirectionData} from "./DirectionData"
import {directionsActions} from "./directions"
import {Toasts} from "../../../common/notification/notifications";

const updateDirection = declareAsyncAction<DirectionData>(
    'updateDirection',
    (directionData, store) => {
        return DirectionsApi.editDirection({
            courseId: directionData.id,
            name: directionData.name,
            description: directionData.description
        })
            .then(() => {
                Toasts.success('Направление успешно изменено')
                store.dispatch(directionsActions.updateDirection({
                    ...directionData,
                }))
            })
            .catch(() => {
                Toasts.error('При изменении направления произошла ошибка')
            })
    }
)

export {
    updateDirection,
}