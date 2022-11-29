import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {HallData} from "./HallData";
import {hallsActions} from "./halls";
import {HallsApi} from "../../../api/hallsApi";
import {Toasts} from "../../../common/notification/notifications";

const saveHall = declareAsyncAction<HallData>('hall.save',
    (direction, store) => {
        return HallsApi.saveHall(direction)
            .then(() => {
                Toasts.success('Зал успешно изменен')
                store.dispatch(hallsActions.updateHall(direction))
            })
            .catch(() => {
                Toasts.error('При изменении направления произошла ошибка')
            })
    }
)

export {
    saveHall,
}