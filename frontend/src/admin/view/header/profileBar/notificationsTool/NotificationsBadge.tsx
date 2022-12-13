import React, {useState} from 'react';
import {Popover} from "antd";
import Badge from "antd/lib/badge";
import {BellOutlined} from "@ant-design/icons";
import {useAction, useAtom} from "@reatom/react";
import {notificationsAtom} from "../../../../viewModel/notifications/notifications";
import {notificationsActions} from "../../../../viewModel/notifications/notifications";
import NotificationsWindow from "./notificationsWindow/NotificationsWindow";
import {
    sendCustomNotificationPopupActions
} from "../../../../viewModel/calendar/sendCustomNotification/sendCustomNotification";
import {authorizedCurrentUser} from "../../../../../currentUser/currentUser";
import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";

const NotificationsBadge = () => {
    const [opened, setOpened] = useState(false)
    const isAdmin = useAtomWithSelector(authorizedCurrentUser, x => x.role === 'admin')
    const notificationList = useAtom(notificationsAtom)
    const clearNotificationsCallback = useAction(notificationsActions.removeAllNotifications)
    const sendNotificationCallback = useAction(sendCustomNotificationPopupActions.open)

    const content = (
        <NotificationsWindow
            showSendNotificationButton={isAdmin}
            notificationList={Object.values(notificationList)}
            onClearButtonClick={clearNotificationsCallback}
            onSendNotificationClick={() => {
                sendNotificationCallback()
                setOpened(false)
            }}
        />
    );

    return (
        <div>
            <Popover open={opened} onOpenChange={setOpened} placement="bottomRight" title={'Уведомления'} content={content} trigger="click">
                <Badge count={Object.values(notificationList).length} offset={[0, 3]} size="small">
                    <BellOutlined style={{ fontSize: '20px', color: '#FFFFFF', cursor: 'pointer' }} />
                </Badge>
            </Popover>
        </div>
    );
};

export default NotificationsBadge;