import {DirectionsApi} from "../../../api/directionsApi"
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction"
import {directionsActions} from "./directions"
import {Toasts} from "../../../common/notification/notifications";

const deleteDirections = declareAsyncAction<string[]>(
    'deleteDirections',
    (directionsIds, store) => {
        return DirectionsApi.deleteDirections(directionsIds)
            .then(() => {
                Toasts.success('Направления успешно удалены')
                store.dispatch(directionsActions.removeDirections(directionsIds))
            })
            .catch(() => {
                Toasts.error('При удалении направлений произошла ошибка')
            })
    }
)

export {
    deleteDirections,
}