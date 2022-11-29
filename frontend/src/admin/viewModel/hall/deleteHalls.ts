import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {hallsActions, hallsAtom} from "./halls";
import {HallsApi} from "../../../api/hallsApi";
import {Toasts} from "../../../common/notification/notifications";

const deleteHalls = declareAsyncAction<string[]>('hall.delete',
    (hallIds, store) => {
        const halls = store.getState(hallsAtom)

        const removedHalls = hallIds.map(id => halls[id])

        store.dispatch(hallsActions.removeHall(hallIds))
        return HallsApi.deleteHalls(hallIds)
            .then(() => {
                Toasts.success('Залы успешно удалены')
            })
            .catch(() => {
                Toasts.error('При удалении залов произошла ошибка')
                store.dispatch(hallsActions.updateHalls(removedHalls))
            })
    }
)

export {
    deleteHalls
}