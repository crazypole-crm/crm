import { UserOutlined } from "@ant-design/icons"
import { useAction } from "@reatom/react"
import { Avatar, Input, Modal } from "antd"
import { useAtomWithSelector } from "../../../../core/reatom/useAtomWithSelector"
import { editUserPasswordPopupActions, editUserPasswordPopupAtom } from "../../../viewModel/editUserPopup/editUserPasswordPopup"
import { editUserPopupFieldStyle } from "./EditUserPopup"
import styles from './EditUserPopup.module.css'
import { EditUserPopupInputBlock } from "./EditUserPopupInputBlock"

function UserOldPasswordInput() {
    const userOldPassword = useAtomWithSelector(editUserPasswordPopupAtom, x => x.userOldPassword)
    const handleSetUserPassword = useAction(editUserPasswordPopupActions.setUserOldPassword)

    return <Input.Password
        value={userOldPassword || ''}
        onChange={e => handleSetUserPassword(e.target.value)}
        style={editUserPopupFieldStyle}
    />
}

function UserPasswordInput() {
    const userNewPassword = useAtomWithSelector(editUserPasswordPopupAtom, x => x.userNewPassword)
    const handleSetUserPassword = useAction(editUserPasswordPopupActions.setUserNewPassword)

    return <Input.Password
        value={userNewPassword || ''}
        onChange={e => handleSetUserPassword(e.target.value)}
        style={editUserPopupFieldStyle}
    />
}

function UserPasswordCheckInput() {
    const userPasswordCheckError = useAtomWithSelector(editUserPasswordPopupAtom, x => x.userNewPasswordCheckError)
    const userPasswordCheck = useAtomWithSelector(editUserPasswordPopupAtom, x => x.userPasswordCheck)
    const handleSetUserPasswordCheck = useAction(editUserPasswordPopupActions.setUserPasswordCheck)

    return <Input.Password
        value={userPasswordCheck || ''}
        status={userPasswordCheckError ? 'error' : ''}
        onChange={e => handleSetUserPasswordCheck(e.target.value)}
        style={editUserPopupFieldStyle}
    />
}

function Content() {
    const userPasswordCheckError = useAtomWithSelector(editUserPasswordPopupAtom, x => x.userNewPasswordCheckError)
    const userOldPasswordError = useAtomWithSelector(editUserPasswordPopupAtom, x => x.userOldPasswordError)

    const userFullName = useAtomWithSelector(editUserPasswordPopupAtom, x => x.userFullName)

    return (
        <div className={styles.content}>
            <div className={styles.upperBlock}>
                <div className={styles.avatarBlock}>
                    <Avatar size={150} icon={<UserOutlined />} />
                </div>
                <p className={styles.userName}>{userFullName}</p>
            </div>
            <div className={styles.fieldsBlock}>
                <EditUserPopupInputBlock
                    title={'Старый пароль'}
                    content={<UserOldPasswordInput/>}
                    error={userOldPasswordError}
                />
                <EditUserPopupInputBlock
                    title={'Новый пароль'}
                    content={<UserPasswordInput/>}
                />
                <EditUserPopupInputBlock
                    title={'Повторите пароль'}
                    content={<UserPasswordCheckInput/>}
                    error={userPasswordCheckError}
                />
            </div>
        </div>
    )
}

function EditUserPasswordPopup() {                                                                                                                                                                                                                                                                                                                                                                                          
    const editUserPasswordPopupOpened = useAtomWithSelector(editUserPasswordPopupAtom, x => x.opened)
    const handleCloseEditUserPasswordPopup = useAction(editUserPasswordPopupActions.close)
    const handleSubmitPassword = useAction(editUserPasswordPopupActions.submit)

    return <Modal
        title={'Пользователь'}
        open={editUserPasswordPopupOpened}
        centered
        okText={'Сохранить'}
        cancelText={'Отмена'}
        onOk={handleSubmitPassword}
        onCancel={handleCloseEditUserPasswordPopup}
        width={774}
    >
        <Content/>
    </Modal>
}

export {
    EditUserPasswordPopup,
}