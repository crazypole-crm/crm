import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {HallData} from "./HallData";
import {hallsActions} from "./halls";
import {HallsApi} from "../../../api/hallsApi";
import {Toasts} from "../../../common/notification/notifications";

const createHall = declareAsyncAction<Omit<HallData, 'id'>>('hall.create',
    (hall, store) => {
        return HallsApi.createHall(hall)
            .then(({hallId}) => {
                Toasts.success('Зал успешно создан')
                store.dispatch(hallsActions.updateHall({
                    id: hallId,
                    ...hall
                }))
            })
            .catch(() => {
                Toasts.error('При создании зала произошла ошибка')
            })
    }
)

export {
    createHall,
}