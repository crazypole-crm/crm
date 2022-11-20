import React from 'react';
import NotificationsBadge from "./notificationsTool/NotificationsBadge";
import {Button} from "antd";
import styles from './ProfileBar.module.css'
import ProfileTool from "./profile/ProfileTool";
import {useAction} from "@reatom/react";
import {logoutAction} from "../../../../currentUser/actions/logout";

const ProfileBar = () => {
    const handleLogoutAction = useAction(logoutAction)
    return (
        <div className={styles.profileBar}>
            <NotificationsBadge/>
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