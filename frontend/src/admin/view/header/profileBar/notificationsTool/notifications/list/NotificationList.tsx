import React, {FC} from 'react';
import {NotificationData} from "../../../../../../viewModel/notifications/NotificationData";
import {List} from 'antd';
import Notification from "../notification/Notification";
import styles from './NotificationList.module.css'

type NotificationListProps = {
    list: NotificationData[]
}

const NotificationList: FC<NotificationListProps> = ({list}) => {

    return (
        <div
            className={styles.list}
            style={{
                height: 300,
                overflow: 'auto',
                padding: '0 16px',

            }}
        >
            <List
                className={styles.list}
                split={true}
                dataSource={list}
                renderItem={item => (
                    <Notification item={item}/>
                )}
            />
        </div>
    );
};

export default NotificationList;