import React from 'react';
import {Popover} from "antd";
import Badge from "antd/lib/badge";
import {BellOutlined} from "@ant-design/icons";
import {useAction, useAtom} from "@reatom/react";
import {notificationsAtom} from "../../../../viewModel/notifications/notifications";
import {notificationsActions} from "../../../../viewModel/notifications/notifications";
import NotificationsWindow from "./notificationsWindow/NotificationsWindow";



const NotificationsBadge = () => {
    const title = <span>Уведомления</span>;
    const notificationList = useAtom(notificationsAtom)
    const clearNotificationsCallback = useAction(notificationsActions.removeAllNotifications)

    const content = (
        <NotificationsWindow notificationList={Object.values(notificationList)} onClearButtonClick={clearNotificationsCallback}/>
    );

    return (
        <div>
            <Popover placement="bottomRight" title={title} content={content} trigger="click">
                <Badge count={Object.values(notificationList).length} offset={[0, 3]} size="small">
                    <BellOutlined style={{ fontSize: '20px', color: '#FFFFFF' }} />
                </Badge>
            </Popover>
        </div>
    );
};

export default NotificationsBadge;