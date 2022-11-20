import React from 'react';
import NotificationsBadge from "./notificationsTool/NotificationsBadge";
import {Button} from "antd";
import styles from './ProfileBar.module.css'
import ProfileTool from "./profile/ProfileTool";

const ProfileBar = () => {
    return (
        <div className={styles.profileBar}>
            <NotificationsBadge/>
            <ProfileTool/>
            <Button type="primary" size="small">Выйти</Button>
        </div>
    );
};

export default ProfileBar;