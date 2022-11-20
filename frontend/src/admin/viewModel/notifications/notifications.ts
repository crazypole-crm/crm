import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import {NotificationData} from "./NotificationData";

const notifExp1: NotificationData = {id: "zhest", title: "I'm sorry, ELDAR", description: "LIFE HAS NO MEANING"}
const notifExp2: NotificationData = {id: "fucken_shit_zhest", title: "I WANNA DIE", description: "...YEAH"}
const notifExp3: NotificationData = {id: "big_zhest", title: "I'm sorry, ELDAR", description: "LIFE HAS NO MEANING"}
const notifExp4: NotificationData = {id: "big_big_zhest", title: "I'm sorry, ELDAR", description: "LIFE HAS NO MEANING"}
const notifExp5: NotificationData = {id: "big_big_big_zhest", title: "I'm sorry, ELDAR", description: "LIFE HAS NO MEANING"}
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