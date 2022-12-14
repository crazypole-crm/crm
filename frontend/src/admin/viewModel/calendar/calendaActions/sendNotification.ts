import {declareAsyncAction} from "../../../../core/reatom/declareAsyncAction";
import {NotificationsApi} from "../../../../api/notificationsApi";
import {UserRole} from "../../users/UserData";
import {remapModelRoleToApiRole} from "../../../../common/role/remapApiRolToModelRole";
import {Toasts} from "../../../../common/notification/notifications";

type SendNotification = {
    role: UserRole,
    title: string,
    body: string,
}

const sendNotification = declareAsyncAction<SendNotification>('sendNotification',
    ({title, role, body}, store) => {
        return NotificationsApi.sendCustomNotification(
            remapModelRoleToApiRole(role),
            title,
            body,
        )
            .then(() => {
                Toasts.success('Уведомление отправлено успешно')
            })
            .catch(() => {
                Toasts.error('При отправке уведомления произошла ошибка')
            })
    }
)

export {
    sendNotification,
}