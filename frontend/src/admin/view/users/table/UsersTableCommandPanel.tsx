import {DeleteOutlined, EditOutlined, PlusOutlined, SettingOutlined} from '@ant-design/icons'
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

type UsersActionsButtonType = 'delete' | 'edit' | 'add'

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
            />}
            trigger={'click'}
            arrowPointAtCenter={true}
            placement={'bottomRight'}
            open={open}
            onOpenChange={setOpen}
            className={styles.selectList}
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
    const users = useAtom(usersAtom)
    const usersLoading = useAtom(usersLoadingAtom)
    const handleOpenEditUserPopup = useAction(editUserPopupActions.open)

    const handleOnEditClick = () => {
        handleOpenEditUserPopup(users[selectedRowKeys[0]])
    }

    const handleOnDeleteClick = () => {
        console.log(`delete user with ids`, selectedRowKeys)
    }

    const handleOnAddClick = () => {
        console.log(`add user`)
    }

    const buttons: UsersActionsButtonType[] = useMemo(() => {
        return optionalArray([
            !selectedRowKeys.length && 'add',
            selectedRowKeys.length === 1 && 'edit',
            !!selectedRowKeys.length && 'delete'    
        ])
    }, [selectedRowKeys])

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
                        default:
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