import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {hallsActions} from "./halls";
import {HallsApi} from "../../../api/hallsApi";
import {Toasts} from "../../../common/notification/notifications";

const deleteHalls = declareAsyncAction<string[]>('hall.delete',
    (hallIds, store) => {
        return HallsApi.deleteHalls(hallIds)
            .then(() => {
                Toasts.success('Залы успешно удалены')
                store.dispatch(hallsActions.removeHall(hallIds))
            })
            .catch(() => {
                Toasts.error('При удалении залов произошла ошибка')
            })
    }
)

export {
    deleteHalls
}