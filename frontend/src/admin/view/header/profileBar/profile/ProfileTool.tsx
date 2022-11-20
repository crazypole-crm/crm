import React from 'react';
import styles from './ProfileTool.module.css';
import {Avatar} from "antd";
import {Typography} from 'antd';
import {useAtom} from "@reatom/react";
import {authorizedCurrentUser} from "../../../../../currentUser/currentUser";

const {Text} = Typography;

const ProfileTool = () => {
    const currentUser = useAtom(authorizedCurrentUser)
    return (
        <div className={styles.profileTool}>
            <Avatar src={currentUser.avatarUrl}/>
            <Text className={styles.text}>{currentUser.firstName} {currentUser.lastName}</Text>
        </div>
    );
};

export default ProfileTool;