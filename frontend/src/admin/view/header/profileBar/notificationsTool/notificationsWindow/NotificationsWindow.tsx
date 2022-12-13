import React, {FC} from 'react';
import NotificationList from "../notifications/list/NotificationList";
import {Button} from "antd";
import styles from './NotificationsWindow.module.css'
import {NotificationData} from "../../../../../viewModel/notifications/NotificationData";

type NotificationWindowProps = {
    showSendNotificationButton: boolean,
    notificationList: NotificationData[],
    onClearButtonClick: () => void,
    onSendNotificationClick: () => void,
}

const NotificationsWindow : FC<NotificationWindowProps> = ({
    showSendNotificationButton,
    notificationList,
    onClearButtonClick,
    onSendNotificationClick,
}) => {
    return (
        <div className={styles.window}>
            <NotificationList list={notificationList}/>
            <div className={styles.footer}>
                {showSendNotificationButton && <Button onClick={onSendNotificationClick} type="primary">Отправить уведомление</Button>}
                {!!notificationList.length && <Button onClick={onClearButtonClick} type="primary">Очистить уведомления</Button>}
            </div>
        </div>
    );
};

export default NotificationsWindow;