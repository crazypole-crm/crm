import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import {useAction, useAtom} from "@reatom/react";
import {Avatar, Modal} from "antd";
import React from "react";
import {viewUserPopupActions, viewUserPopupAtom} from "../../../viewModel/users/viewUserPopup/viewUserPopup";
import styles from './ViewUserPopup.module.css'
import {UserRole} from "../../../viewModel/users/UserData";
import {UserOutlined} from "@ant-design/icons";
import {getValueByCheckedKey} from "../../../../core/getValueByCheckedKey";


function UserInfo() {
    const avatarUrl = useAtomWithSelector(viewUserPopupAtom, x => x.avatarUrl)
    const fullName = useAtomWithSelector(viewUserPopupAtom, x => x.fullName)

    return (
        <div className={styles.userInfoRow}>
            <Avatar
                size={150}
                icon={<UserOutlined />}
                src={avatarUrl}
                style={{
                    flexShrink: 0,
                }}
            />
            <div className={styles.name}>
                {fullName}
            </div>
        </div>
    )
}

type UserFieldBlockProps = {
    title: string,
    value: string,
}

function UserFieldBlock({
    value,
    title,
}: UserFieldBlockProps) {
    return (
        <div className={styles.fieldBlock}>
            <div className={styles.fieldTitle}>{title}</div>
            <div className={styles.fieldValue}>{value}</div>
        </div>
    )
}

function getRoleTitle(role: UserRole): string {
    return getValueByCheckedKey(role, {
        'admin': 'Администратор',
        'trainer': 'Тренер',
        'client': 'Клиент',
    })
}

function getMonthTitle(monthNumber: number): string {
    const moths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    return moths[monthNumber]
}

function getBirthDayString(birthDay: Date): string {
    return `${birthDay.getDate()} ${getMonthTitle(birthDay.getMonth())} ${birthDay.getFullYear()}`
}

function Content() {
    const phone = useAtomWithSelector(viewUserPopupAtom, x => x.phone)
    const email = useAtomWithSelector(viewUserPopupAtom, x => x.email)
    const role = useAtomWithSelector(viewUserPopupAtom, x => x.role)
    const birthDay = useAtomWithSelector(viewUserPopupAtom, x => x.birthDay)

    return (
        <div className={styles.content}>
            <UserInfo />
            <UserFieldBlock
                title={'Email'}
                value={email}
            />
            {phone && <UserFieldBlock
                title={'Номер телефона'}
                value={phone}
            />}
            {role && <UserFieldBlock
                title={'Роль'}
                value={getRoleTitle(role)}
            />}
            {birthDay && <UserFieldBlock
                title={'Дата рождения'}
                value={getBirthDayString(birthDay)}
            />}
        </div>
    )
}

function ViewUserPopup() {
    const viewUserPopupOpened = useAtomWithSelector(viewUserPopupAtom, x => x.opened)
    const handleCloseUserPopup = useAction(viewUserPopupActions.close)

    return <Modal
        title={'Пользователь'}
        open={viewUserPopupOpened}
        centered
        cancelText={'Отмена'}
        onCancel={handleCloseUserPopup}
        okButtonProps={{
            style: {
                display: "none"
            }
        }}
    >
        <Content/>
    </Modal>
}

export {
    ViewUserPopup,
}