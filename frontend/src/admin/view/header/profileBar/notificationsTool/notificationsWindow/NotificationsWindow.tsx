import React, {FC} from 'react';
import NotificationList from "../notifications/list/NotificationList";
import {Button} from "antd";
import styles from './NotificationsWindow.module.css'
import {NotificationData} from "../../../../../viewModel/notifications/NotificationData";

type NotificationWindowProps = {
    notificationList: NotificationData[],
    onClearButtonClick: () => void
}

const NotificationsWindow : FC<NotificationWindowProps> = ({notificationList, onClearButtonClick}) => {
    return (
        <div className={styles.window}>
            <NotificationList list={notificationList}/>
            {!!notificationList.length && <div className={styles.footer}>
                <Button onClick={onClearButtonClick} type="primary">Очистить уведомления</Button>
            </div>}
        </div>
    );
};

export default NotificationsWindow;