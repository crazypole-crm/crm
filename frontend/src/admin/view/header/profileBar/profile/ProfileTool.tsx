import React from 'react';
import styles from './ProfileTool.module.css';
import {Avatar, Typography} from "antd";
import {useAction, useAtom} from "@reatom/react";
import {authorizedCurrentUser} from "../../../../../currentUser/currentUser";
import {editUserPopupActions} from "../../../../viewModel/editUserPopup/editUserPopup";
import {UserOutlined} from "@ant-design/icons";
import { getFullName } from '../../../../../common/name';

const {Text} = Typography;

const ProfileTool = () => {
    const currentUser = useAtom(authorizedCurrentUser)
    const handleOpenEditUserPopup = useAction(editUserPopupActions.open)

    return (
        <div
            className={styles.profileTool}
            onClick={() => handleOpenEditUserPopup({
                mode: 'edit',
                userData: currentUser,
            })}
        >
            <Avatar icon={<UserOutlined />} src={currentUser.avatarUrl}/>
            <Text className={styles.text}>{getFullName({
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
            }) || currentUser.email}</Text>
        </div>
    );
};

export default ProfileTool;