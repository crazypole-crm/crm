import React from 'react';
import {Button} from "antd";
import styles from './ProfileBar.module.css'
import ProfileTool from "./profile/ProfileTool";
import {useAction} from "@reatom/react";
import {logoutAction} from "../../../../currentUser/actions/logout";
import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import {authorizedCurrentUser} from "../../../../currentUser/currentUser";
import {BellOutlined} from "@ant-design/icons";
import {
    sendCustomNotificationPopupActions
} from "../../../viewModel/calendar/sendCustomNotification/sendCustomNotification";

const ProfileBar = () => {
    const isAdmin = useAtomWithSelector(authorizedCurrentUser, x => x.role === 'admin')
    const handleLogoutAction = useAction(logoutAction)
    const sendNotificationCallback = useAction(sendCustomNotificationPopupActions.open)

    return (
        <div className={styles.profileBar}>
            {isAdmin && <Button
                icon={<BellOutlined/>}
                onClick={sendNotificationCallback}
                style={{
                    borderRadius: '50%',
                }}
            />}
            <ProfileTool/>
            <Button
                onClick={handleLogoutAction}
                type="primary"
                size="small"
            >Выйти</Button>
        </div>
    );
};

export default ProfileBar;