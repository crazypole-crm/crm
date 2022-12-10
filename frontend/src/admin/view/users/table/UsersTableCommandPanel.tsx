import {DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SettingOutlined} from '@ant-design/icons'
import {Button, Popover} from 'antd'
import {useMemo, useState} from 'react'
import {SelectList, SelectListItemData} from '../../../../common/selectList/SelectList'
import {optionalArray} from '../../../../core/array/array'
import {COLLUMN_TO_TITLE_MAP, COLLUMS_IDS, DISABLED_COLLUMNS} from './userTableDataConsts'
import {CollumnIdType} from './UsersTable'
import styles from './UsersTableCommandPanel.module.css'
import {VisibleCollumsData} from './CollumnsData'
import {useAction, useAtom} from "@reatom/react";
import {editUserPopupActions} from "../../../viewModel/editUserPopup/editUserPopup";
import {usersAtom} from "../../../viewModel/users/users";
import {usersLoadingAtom} from "../../../viewModel/users/loadUsers";
import {authorizedCurrentUser} from "../../../../currentUser/currentUser";
import {viewUserPopupActions} from "../../../viewModel/users/viewUserPopup/viewUserPopup";
import {checkNever} from "../../../../core/checkNever";
import {deleteUser} from "../../../viewModel/users/deleteUser";

type UsersActionsButtonType = 'delete' | 'edit' | 'add' | 'view'

type CollumnsFilterProps = {
    visibleCollumns: VisibleCollumsData,
    setVisibleCollumns: (id: CollumnIdType, checked: boolean) => void,
}

function CollumnsFilter({
    setVisibleCollumns,
    visibleCollumns,
}: CollumnsFilterProps) {
    const usersLoading = useAtom(usersLoadingAtom)
    const [open, setOpen] = useState(false)
    
    const items: SelectListItemData<CollumnIdType>[] = COLLUMS_IDS.map(collumnId => ({
        id: collumnId,
        checked: !!visibleCollumns[collumnId],
        text: COLLUMN_TO_TITLE_MAP.get(collumnId) || '',
        disabled: DISABLED_COLLUMNS.includes(collumnId),
    }))

    const handleCheckedChanged = (id: CollumnIdType, checked: boolean) => {
        setVisibleCollumns(id, checked)
    }

    return (
        <Popover
            content={<SelectList
                items={items}
                onCheckedChanged={handleCheckedChanged}
                className={styles.selectList}
            />}
            trigger={'click'}
            placement={'bottomRight'}
            open={open}
            onOpenChange={setOpen}
        >
            <Button
                icon={<SettingOutlined />}
                type={'primary'}
                ghost
                size='large'
                onClick={() => setOpen(true)}
                disabled={usersLoading}
            />
        </Popover>
    )
}


type UsersActionsButtonProps = {
    selectedRowKeys: React.Key[],
    visibleCollumns: VisibleCollumsData,
    setVisibleCollumns: (id: CollumnIdType, checked: boolean) => void,
}

function UsersTableCommandPanel({
    selectedRowKeys,
    setVisibleCollumns,
    visibleCollumns,
}: UsersActionsButtonProps) {
    const currentUser = useAtom(authorizedCurrentUser)
    const users = useAtom(usersAtom)
    const usersLoading = useAtom(usersLoadingAtom)
    const handleOpenEditUserPopup = useAction(editUserPopupActions.open)
    const handleOpenViewUserPopup = useAction(viewUserPopupActions.open)
    const handleDeleteUser = useAction(deleteUser)

    const handleOnEditClick = () => {
        handleOpenEditUserPopup({
            userData: users[selectedRowKeys[0]],
            mode: 'edit',
        })
    }

    const handleOnViewClick = () => {
        handleOpenViewUserPopup({
            ...users[selectedRowKeys[0]]
        })
    }

    const handleOnDeleteClick = () => {
        handleDeleteUser(selectedRowKeys as string[])
    }

    const handleOnAddClick = () => {
        handleOpenEditUserPopup({
            mode: 'create',
        })
    }

    const buttons: UsersActionsButtonType[] = useMemo(() => {
        const isAdmin = currentUser.role === 'admin'
        const isTrainer = currentUser.role === 'trainer'
        return optionalArray([
            (isAdmin && !selectedRowKeys.length) && 'add',
            (isAdmin && selectedRowKeys.length === 1) && 'edit',
            (isAdmin && !!selectedRowKeys.length) && 'delete',
            ((isAdmin || isTrainer) && selectedRowKeys.length === 1) && 'view',
        ])
    }, [selectedRowKeys, currentUser.role])

    return (
        <div className={styles.commandPanel}>
            <div className={styles.buttonsContainer}>
                {buttons.map(buttonType => {
                    switch (buttonType) {
                        case 'edit':
                            return <Button
                                key={buttonType}
                                type='primary'
                                ghost
                                size='large'
                                onClick={handleOnEditClick}
                                className={styles.submitButton}
                                icon={<EditOutlined />}
                                disabled={usersLoading}
                            >
                                Редактировать
                            </Button>
                        case 'delete':
                            return <Button
                                key={buttonType}
                                type='primary'
                                ghost
                                size='large'
                                onClick={handleOnDeleteClick}
                                className={styles.submitButton}
                                icon={<DeleteOutlined />}
                                disabled={usersLoading}
                            >
                                Удалить
                            </Button>
                        case 'add':
                            return <Button
                                key={buttonType}
                                type='primary'
                                ghost
                                size='large'
                                onClick={handleOnAddClick}
                                className={styles.submitButton}
                                icon={<PlusOutlined />}
                                disabled={usersLoading}
                            >
                                Добавить
                            </Button>
                        case 'view':
                            return <Button
                                key={buttonType}
                                type='primary'
                                ghost
                                size='large'
                                onClick={handleOnViewClick}
                                className={styles.submitButton}
                                icon={<EyeOutlined />}
                                disabled={usersLoading}
                            >
                                Посмотреть
                            </Button>
                        default:
                            checkNever(buttonType)
                            throw new Error()
                    }
                })}
            </div>
            <CollumnsFilter
                visibleCollumns={visibleCollumns}
                setVisibleCollumns={setVisibleCollumns}
            />
        </div>
    )
}

export {
    UsersTableCommandPanel,
}

export type {
    UsersActionsButtonType,
}