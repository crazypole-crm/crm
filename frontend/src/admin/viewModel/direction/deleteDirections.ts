import {DirectionsApi} from "../../../api/directionsApi"
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction"
import {directionsActions, directionsAtom} from "./directions"
import {Toasts} from "../../../common/notification/notifications";

const deleteDirections = declareAsyncAction<string[]>(
    'deleteDirections',
    (directionsIds, store) => {
        const directions = store.getState(directionsAtom)

        const removedDirections = directionsIds.map(id => directions[id])

        store.dispatch(directionsActions.removeDirections(directionsIds))
        return DirectionsApi.deleteDirections(directionsIds)
            .then(() => {
                Toasts.success('Направления успешно удалены')
            })
            .catch(() => {
                Toasts.error('При удалении направлений произошла ошибка')
                store.dispatch(directionsActions.updateDirections(removedDirections))
            })
    }
)

export {
    deleteDirections,
}