import React, {useMemo} from "react";
import {useAction, useAtom} from "@reatom/react"
import {editUserPopupActions, editUserPopupAtom} from "../../../viewModel/editUserPopup/editUserPopup"
import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import {Avatar, Button, DatePicker, DatePickerProps, Input, Modal, Select} from "antd";
import styles from './EditUserPopup.module.css'
import {UserOutlined} from "@ant-design/icons";
import {userRoles} from "../../../viewModel/users/UserData";
import {mapRoleTypeToText} from "../table/cells/UserRoleCell";
import UserPicUploader from "./UserPicUploader";
import moment, {Moment} from "moment";
import ruRU from "antd/lib/calendar/locale/ru_RU";
import {EditUserPopupInputBlock} from "./EditUserPopupInputBlock";
import {authorizedCurrentUser} from "../../../../currentUser/currentUser";
import {optionalArray} from "../../../../core/array/array";
import {editUserPasswordPopupActions} from "../../../viewModel/editUserPopup/editUserPasswordPopup";

const editUserPopupFieldStyle: React.CSSProperties = {
    width: 320,
}

function UserLastNameInput() {
    const userLastName = useAtomWithSelector(editUserPopupAtom, x => x.userLastName)
    const handleSetUserLastName = useAction(editUserPopupActions.setUserLastName)

    return <Input
        value={userLastName || ''}
        onChange={e => handleSetUserLastName(e.target.value)}
        style={editUserPopupFieldStyle}
    />
}

function UserFirstNameInput() {
    const userFirstName = useAtomWithSelector(editUserPopupAtom, x => x.userFirstName)
    const handleSetUserFirstName = useAction(editUserPopupActions.setUserFirstName)

    return <Input
        value={userFirstName || ''}
        onChange={e => handleSetUserFirstName(e.target.value)}
        style={editUserPopupFieldStyle}
    />
}

function UserMiddleNameInput() {
    const userMiddleName = useAtomWithSelector(editUserPopupAtom, x => x.userMiddleName)
    const handleSetUserMiddleName = useAction(editUserPopupActions.setUserMiddleName)

    return <Input
        value={userMiddleName || ''}
        onChange={e => handleSetUserMiddleName(e.target.value)}
        style={editUserPopupFieldStyle}
    />
}

function UserBirthDayPicker() {
    const userBirthDay = useAtomWithSelector(editUserPopupAtom, x => x.userBirthDay)
    const handleSetUserBirthDay = useAction(editUserPopupActions.setUserBirthDay)

    const disabledDate = (date: Moment) => (date > moment(new Date()))

    const momentDate = useMemo(() =>(userBirthDay && moment(userBirthDay)), [userBirthDay])

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
        format={'DD/MM/YYYY'}
        style={editUserPopupFieldStyle}
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
        style={editUserPopupFieldStyle}
    />
}

function UserEmailInput() {
    const userEmailError = useAtomWithSelector(editUserPopupAtom, x => x.userEmailError)
    const userEmail = useAtomWithSelector(editUserPopupAtom, x => x.userEmail)
    const handleSetUserEmail = useAction(editUserPopupActions.setUserEmail)

    return <Input
        value={userEmail || ''}
        status={userEmailError ? 'error' : ''}
        onChange={e => handleSetUserEmail(e.target.value)}
        style={editUserPopupFieldStyle}
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
                value: userRoles[1],
                label: mapRoleTypeToText(userRoles[1]),
            },
            {
                value: userRoles[2],
                label: mapRoleTypeToText(userRoles[2]),
            },
        ]}
        style={editUserPopupFieldStyle}
    />
}

function UserEditPasswordButton() {
    const userId = useAtomWithSelector(editUserPopupAtom, x => x.userId)
    const userLastName = useAtomWithSelector(editUserPopupAtom, x => x.userLastName)
    const userFirstName = useAtomWithSelector(editUserPopupAtom, x => x.userFirstName)
    const userMiddleName = useAtomWithSelector(editUserPopupAtom, x => x.userMiddleName)

    const handleOpenEditUserPasswordPopup = useAction(editUserPasswordPopupActions.open)

    const onClick = () => {
        handleOpenEditUserPasswordPopup({
            userId: userId || '',
            userFullName : optionalArray([userLastName, userFirstName, userMiddleName]).join(' ')
        })
    }

    return <Button
        type="primary"
        onClick={onClick}
        style={editUserPopupFieldStyle}
    >
        Изменить пароль
    </Button>
}

function UserPasswordInput() {
    const userNewPassword = useAtomWithSelector(editUserPopupAtom, x => x.userNewPassword)
    const userNewPasswordError = useAtomWithSelector(editUserPopupAtom, x => x.userNewPasswordError)
    const handleSetUserPassword = useAction(editUserPopupActions.setUserNewPassword)

    return <Input.Password
        value={userNewPassword || ''}
        status={userNewPasswordError ? 'error' : ''}
        onChange={e => handleSetUserPassword(e.target.value)}
        style={editUserPopupFieldStyle}
    />
}

function UserPasswordCheckInput() {
    const userPasswordCheckError = useAtomWithSelector(editUserPopupAtom, x => x.userNewPasswordCheckError)
    const userPasswordCheck = useAtomWithSelector(editUserPopupAtom, x => x.userPasswordCheck)
    const handleSetUserPasswordCheck = useAction(editUserPopupActions.setUserPasswordCheck)

    return <Input.Password
        value={userPasswordCheck || ''}
        status={userPasswordCheckError ? 'error' : ''}
        onChange={e => handleSetUserPasswordCheck(e.target.value)}
        style={editUserPopupFieldStyle}
    />
}

function Content() {
    const userPhoneError = useAtomWithSelector(editUserPopupAtom, x => x.userPhoneError)
    const userEmailError = useAtomWithSelector(editUserPopupAtom, x => x.userEmailError)

    const userLastName = useAtomWithSelector(editUserPopupAtom, x => x.userLastName)
    const userFirstName = useAtomWithSelector(editUserPopupAtom, x => x.userFirstName)
    const userMiddleName = useAtomWithSelector(editUserPopupAtom, x => x.userMiddleName)
    const userNewPasswordError = useAtomWithSelector(editUserPopupAtom, x => x.userNewPasswordError)
    const userNewPasswordCheckError = useAtomWithSelector(editUserPopupAtom, x => x.userNewPasswordCheckError)
    const userId = useAtomWithSelector(editUserPopupAtom, x => x.userId)
    const currentUser = useAtom(authorizedCurrentUser)
    const popupMode = useAtomWithSelector(editUserPopupAtom, x => x.popupMode)

    return (
        <div className={styles.content}>
            <div className={styles.upperBlock}>
                <div className={styles.avatarBlock}>
                    <Avatar size={150} icon={<UserOutlined />} />
                    <UserPicUploader/>
                </div>
                <p className={styles.userName}>{optionalArray([userLastName, userFirstName, userMiddleName]).join(' ')}</p>
            </div>
            <div className={styles.fieldsBlock}>
                <EditUserPopupInputBlock
                    title={'Фамилия'}
                    content={<UserLastNameInput/>}
                />
                <EditUserPopupInputBlock
                    title={'Имя'}
                    content={<UserFirstNameInput/>}
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
                    error={userPhoneError}
                />
                <EditUserPopupInputBlock
                    title={'Email'}
                    content={<UserEmailInput/>}
                    error={userEmailError}
                />
                {currentUser.role === 'admin' && currentUser.id !== userId && <EditUserPopupInputBlock
                    title={'Роль'}
                    content={<UserRoleSelect/>}
                />}
                {(popupMode === 'edit' &&  currentUser.id === userId) && <EditUserPopupInputBlock
                    title={'Пароль'}
                    content={<UserEditPasswordButton/>}
                />}
                {(popupMode === 'create') && <EditUserPopupInputBlock
                    title={'Новый пароль'}
                    content={<UserPasswordInput/>}
                    error={userNewPasswordError}
                />}
                {(popupMode === 'create') && <EditUserPopupInputBlock
                    title={'Повторите пароль'}
                    content={<UserPasswordCheckInput/>}
                    error={userNewPasswordCheckError}
                />}
            </div>
        </div>
    )
}

function EditUserPopup() {                                                                                                                                                                                                                                                                                                                                                                                          
    const editUserPopupOpened = useAtomWithSelector(editUserPopupAtom, x => x.opened)
    const submitButtonLoading = useAtomWithSelector(editUserPopupAtom, x => x.submitButtonLoading)
    const handleCloseEditUserPopup = useAction(editUserPopupActions.close)
    const handleSubmitUser = useAction(editUserPopupActions.submit)

    return <Modal
        title={'Пользователь'}
        open={editUserPopupOpened}
        centered
        okText={'Сохранить'}
        cancelText={'Отмена'}
        okButtonProps={{
            loading: submitButtonLoading,
            type: 'primary',
            onClick: handleSubmitUser,
        }}
        onCancel={handleCloseEditUserPopup}
        width={774}
    >
        <Content/>
    </Modal>
}

export {
    EditUserPopup,
    editUserPopupFieldStyle,
}