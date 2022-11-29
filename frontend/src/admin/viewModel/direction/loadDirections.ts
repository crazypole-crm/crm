import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {directionsActions} from "./directions";
import {declareAtom} from "@reatom/core";
import {DirectionsApi} from "../../../api/directionsApi";
import {Toasts} from "../../../common/notification/notifications";

const loadDirections = declareAsyncAction<void>('directions.load',
    (_, store) => {
        return DirectionsApi.getDirections()
            .then(directions => {
                store.dispatch(directionsActions.updateDirections(directions))
            })
            .catch(() => {
                Toasts.error('При загрузке направлений произощла ошибка')
            })
    }
)

const directionsLoadingAtom = declareAtom('directions.loading', true, on => [
    on(loadDirections, () => true),
    on(loadDirections.done, () => false),
    on(loadDirections.fail, () => false),
])

export {
    loadDirections,
    directionsLoadingAtom,
}