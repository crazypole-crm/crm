import React, { useMemo } from "react";
import { useAction } from "@reatom/react"
import { editUserPopupActions, editUserPopupAtom } from "../../../viewModel/editUserPopup/editUserPopup"
import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import { Avatar, DatePicker, DatePickerProps, Input, Modal, Select } from "antd";
import styles from './EditUserPopup.module.css'
import { UserOutlined } from "@ant-design/icons";
import { userRoles } from "../../../viewModel/users/UserData";
import { mapRoleTypeToText } from "../table/cells/UserRoleCell";
import UserPicUploader from "./UserPicUploader";
import moment, { Moment } from "moment";
import ruRU from "antd/lib/calendar/locale/ru_RU";
import { EditUserPopupInputBlock } from "./EditUserPopupInputBlock";

const fieldStyle: React.CSSProperties = {
    //padding: 12,
    //paddingLeft: 8,
    //paddingRight: 8,
    width: 320,
    //height: 55,
    //borderRadius: 10,
    //fontFamily: 'Roboto',
    //fontStyle: normal,
    //fontWeight: 400,
    //fontSize: 24,
    //lineHeight: 24px,
}

function UserLastNameInput() {
    const userLastNameError = useAtomWithSelector(editUserPopupAtom, x => x.userLastNameError)
    const userLastName = useAtomWithSelector(editUserPopupAtom, x => x.userLastName)
    const handleSetUserLastName = useAction(editUserPopupActions.setUserLastName)

    return <Input
        value={userLastName || ''}
        status={userLastNameError ? 'error' : ''}
        onChange={e => handleSetUserLastName(e.target.value)}
        style={fieldStyle}
    />
}

function UserFirstNameInput() {
    const userFirstName = useAtomWithSelector(editUserPopupAtom, x => x.userFirstName)
    const handleSetUserFirstName = useAction(editUserPopupActions.setUserFirstName)
    const userFirstNameError = useAtomWithSelector(editUserPopupAtom, x => x.userFirstNameError)

    return <Input
        value={userFirstName || ''}
        status={userFirstNameError ? 'error' : ''}
        onChange={e => handleSetUserFirstName(e.target.value)}
        style={fieldStyle}
    />
}

function UserMiddleNameInput() {
    const userMiddleName = useAtomWithSelector(editUserPopupAtom, x => x.userMiddleName)
    const handleSetUserMiddleName = useAction(editUserPopupActions.setUserMiddleName)

    return <Input
        value={userMiddleName || ''}
        onChange={e => handleSetUserMiddleName(e.target.value)}
        style={fieldStyle}
    />
}

function UserBirthDayPicker() {
    const userBirthDay = useAtomWithSelector(editUserPopupAtom, x => x.userBirthDay)
    const handleSetUserBirthDay = useAction(editUserPopupActions.setUserBirthDay)

    const disabledDate = (date: Moment) => {
        return date > moment(new Date)
    };

    const momentDate = useMemo(() => moment(userBirthDay), [userBirthDay])

    const onChange: DatePickerProps['onChange'] = (value) => {
        if (value) {
            handleSetUserBirthDay(value.toDate())
        }
    }

    return <DatePicker 
        value={momentDate} 
        onChange={onChange} 
        locale={ruRU} 
        allowClear={true}
        disabledDate={disabledDate}
        style={fieldStyle}
    />
}

function UserPhoneInput() {
    const userPhoneError = useAtomWithSelector(editUserPopupAtom, x => x.userPhoneError)
    const userPhone = useAtomWithSelector(editUserPopupAtom, x => x.userPhone)
    const handleSetUserPhone = useAction(editUserPopupActions.setUserPhone)

    return <Input
        value={userPhone || ''}
        status={userPhoneError ? 'error' : ''}
        onChange={e => handleSetUserPhone(e.target.value)}
        style={fieldStyle}
    />
}

function UserEmailInput() {
    const userEmptyEmailError = useAtomWithSelector(editUserPopupAtom, x => x.userEmptyEmailError)
    const userIncorrectEmailError = useAtomWithSelector(editUserPopupAtom, x => x.userIncorrectEmailError)
    const userEmail = useAtomWithSelector(editUserPopupAtom, x => x.userEmail)
    const handleSetUserEmail = useAction(editUserPopupActions.setUserEmail)

    return <Input
        value={userEmail || ''}
        status={(userEmptyEmailError || userIncorrectEmailError) ? 'error' : ''}
        onChange={e => handleSetUserEmail(e.target.value)}
        style={fieldStyle}
    />
}

function UserRoleSelect() {
    const userRole = useAtomWithSelector(editUserPopupAtom, x => x.userRole)
    const handleSetUserRole = useAction(editUserPopupActions.setUserRole)

    return <Select
        defaultValue={userRole}
        onChange={handleSetUserRole}
        options={[
            {
                value: userRoles[0],
                label: mapRoleTypeToText(userRoles[0]),
            },
            {
                value: userRoles[1],
                label: mapRoleTypeToText(userRoles[1]),
            },
            {
                value: userRoles[2],
                label: mapRoleTypeToText(userRoles[2]),
            },
        ]}
        style={fieldStyle}
    />
}

function UserPasswordInput() {
    const userPassword = useAtomWithSelector(editUserPopupAtom, x => x.userPassword)
    const handleSetUserPassword = useAction(editUserPopupActions.setUserPassword)

    return <Input.Password
        value={userPassword || ''}
        onChange={e => handleSetUserPassword(e.target.value)}
        style={fieldStyle}
    />
}

function UserPasswordCheckInput() {
    const userPasswordCheckError = useAtomWithSelector(editUserPopupAtom, x => x.userPasswordCheckError)
    const userPasswordCheck = useAtomWithSelector(editUserPopupAtom, x => x.userPasswordCheck)
    const handleSetUserPasswordCheck = useAction(editUserPopupActions.setUserPasswordCheck)

    return <Input.Password
        value={userPasswordCheck || ''}
        status={userPasswordCheckError ? 'error' : ''}
        onChange={e => handleSetUserPasswordCheck(e.target.value)}
        style={fieldStyle}
    />
}

function Content() {
    const userLastNameError = useAtomWithSelector(editUserPopupAtom, x => x.userLastNameError)
    const userFirstNameError = useAtomWithSelector(editUserPopupAtom, x => x.userFirstNameError)
    const userPhoneError = useAtomWithSelector(editUserPopupAtom, x => x.userPhoneError)
    const userEmptyEmailError = useAtomWithSelector(editUserPopupAtom, x => x.userEmptyEmailError)
    const userIncorrectEmailError = useAtomWithSelector(editUserPopupAtom, x => x.userIncorrectEmailError)
    const userPasswordCheckError = useAtomWithSelector(editUserPopupAtom, x => x.userPasswordCheckError)

    const userLastName = useAtomWithSelector(editUserPopupAtom, x => x.userLastName)
    const userFirstName = useAtomWithSelector(editUserPopupAtom, x => x.userFirstName)
    const userMiddleName = useAtomWithSelector(editUserPopupAtom, x => x.userMiddleName)

    return (
        <div className={styles.content}>
            <div className={styles.upperBlock}>
                <div className={styles.avatarBlock}>
                    <Avatar size={150} icon={<UserOutlined />} />
                    <UserPicUploader/>
                </div>
                <p className={styles.userName}>{userLastName+' '+userFirstName+' '+userMiddleName}</p>
            </div>
            <div className={styles.fieldsBlock}>
                <EditUserPopupInputBlock
                    title={'Фамилия'}
                    content={<UserLastNameInput/>}
                    errorEmpty={userLastNameError}
                />
                <EditUserPopupInputBlock
                    title={'Имя'}
                    content={<UserFirstNameInput/>}
                    errorEmpty={userFirstNameError}
                />
                <EditUserPopupInputBlock
                    title={'Отчество'}
                    content={<UserMiddleNameInput/>}
                />
                <EditUserPopupInputBlock
                    title={'Дата рождения'}
                    content={<UserBirthDayPicker/>}
                />
                <EditUserPopupInputBlock
                    title={'Номер Телефона'}
                    content={<UserPhoneInput/>}
                    errorIncorrect={userPhoneError}
                />
                <EditUserPopupInputBlock
                    title={'Email'}
                    content={<UserEmailInput/>}
                    errorEmpty={userEmptyEmailError}
                    errorIncorrect={userIncorrectEmailError}
                />
                <EditUserPopupInputBlock
                    title={'Новый пароль'}
                    content={<UserPasswordInput/>}
                />
                <EditUserPopupInputBlock
                    title={'Роль'}
                    content={<UserRoleSelect/>}
                />
                <EditUserPopupInputBlock
                    title={'Повторите пароль'}
                    content={<UserPasswordCheckInput/>}
                    errorIncorrect={userPasswordCheckError}
                />
            </div>
        </div>
    )
}

function EditUserPopup() {                                                                                                                                                                                                                                                                                                                                                                                          
    const editUserPopupOpened = useAtomWithSelector(editUserPopupAtom, x => x.opened)
    const handleCloseEditUserPopup = useAction(editUserPopupActions.close)
    const handleSubmitUser = useAction(editUserPopupActions.submit)

    return <Modal
        title={'Пользователь'}
        open={editUserPopupOpened}
        centered
        okText={'Сохранить'}
        cancelText={'Отмена'}
        onOk={handleSubmitUser}
        onCancel={handleCloseEditUserPopup}
        width={774}
    >
        <Content/>
    </Modal>
}

export {
    EditUserPopup,
}