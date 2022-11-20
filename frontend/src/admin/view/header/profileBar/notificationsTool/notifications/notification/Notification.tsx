import React, {FC} from 'react';
import {NotificationData} from "../../../../../../viewModel/notifications/NotificationData";
import styles from './Notification.module.css'
import {Alert} from "antd";

type NotificationProps = {
    item: NotificationData
}

const Notification: FC<NotificationProps> = ({item}) => {
    return (
        <div className={styles.notification}>
            <Alert
                message={item.title}
                description={item.description}
                type="info"
            />
        </div>
    );
};

export default Notification;