import {DirectionsApi} from "../../../api/directionsApi"
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction"
import {DirectionData} from "./DirectionData"
import {directionsActions} from "./directions"
import {Toasts} from "../../../common/notification/notifications";

const createDirection = declareAsyncAction<Omit<DirectionData, 'id'>>(
    'createDirection',
    (directionData, store) => {
        return DirectionsApi.createDirection(directionData)
            .then(({courseId}) => {
                Toasts.success('Направление успешно создано')
                store.dispatch(directionsActions.updateDirection({
                    ...directionData,
                    id: courseId
                }))
            })
            .catch(() => Toasts.error('При создании направления произошла ошибка'))
    }
)

export {
    createDirection,
}