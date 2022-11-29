import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {hallsActions} from "./halls";
import {declareAtom} from "@reatom/core";
import {HallsApi} from "../../../api/hallsApi";
import {Toasts} from "../../../common/notification/notifications";

const loadHalls = declareAsyncAction<void>('directions.load',
    (_, store) => {
        return HallsApi.getHalls()
            .then(halls => {
                store.dispatch(hallsActions.updateHalls(halls))
            })
            .catch(() => {
                Toasts.error('При получении списка залов произошла ошибка')
            })
    }
)

const hallsLoadingAtom = declareAtom('halls.loading', true, on => [
    on(loadHalls, () => true),
    on(loadHalls.done, () => false),
    on(loadHalls.fail, () => false),
])

export {
    loadHalls,
    hallsLoadingAtom,
}