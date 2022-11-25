import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import {NotificationData} from "./NotificationData";

const notifExp1: NotificationData = {id: "zhest", title: "Notification 1", description: "Notification Description"}
const notifExp2: NotificationData = {id: "fucken_shit_zhest", title: "Notification 2", description: "Notification Description"}
const notifExp3: NotificationData = {id: "big_zhest", title: "Notification 3", description: "Notification Description"}
const notifExp4: NotificationData = {id: "big_big_zhest", title: "Notification 4", description: "Notification Description"}
const notifExp5: NotificationData = {id: "big_big_big_zhest", title: "Notification 5", description: "LIFE HAS NO MEANING"}
const dataExp:  NotificationData[] = [notifExp1, notifExp2, notifExp3, notifExp4, notifExp5]

const {
    atom: notificationsAtom,
    setNewItems: setNewNotifications,
    removeAllItems: removeAllNotifications,
} = declareMapAtom<NotificationData>(
    'notifications',
    notification => notification.id,
    undefined,
    dataExp,
)

const notificationsActions = {
    removeAllNotifications,
    setNewNotifications,
}

export {
    notificationsActions,
    notificationsAtom,
}