import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { useAction, useAtom } from "@reatom/react"
import { Button } from "antd"
import React, { useMemo } from "react"
import { optionalArray } from "../../../core/array/array"
import { checkNever } from "../../../core/checkNever"
import { authorizedCurrentUser } from "../../../currentUser/currentUser"
import { hallsAtom } from "../../viewModel/hall/halls"
import { hallsLoadingAtom } from "../../viewModel/hall/loadHalls"
import styles from '../users/table/UsersTableCommandPanel.module.css'
import { selectedHallsRowKeysAtom } from "../../viewModel/hall/popups/selectedHallsRows"
import { editHallPopupActions } from "../../viewModel/hall/popups/editHallPopup"
import { deleteHallsPopupActions } from "../../viewModel/hall/popups/deleteHallsPopup"

type HallsActionsButtonType = 'delete' | 'edit' | 'add' 

function remapKeyListToStringList(list: React.Key[]): string[] {
    return list.map((key) => key.toString())
}

function HallsTableCommandPanel() {
    const currentUser = useAtom(authorizedCurrentUser)
    const halls = useAtom(hallsAtom)
    const hallsLoading = useAtom(hallsLoadingAtom)
    const selectedHallsRowKeys = useAtom(selectedHallsRowKeysAtom)
    const handleOpenEditHallPopup = useAction(editHallPopupActions.open)
    const handleOpenDeleteHallPopup = useAction(deleteHallsPopupActions.open)

    const handleOnAddClick = () => {
        handleOpenEditHallPopup({
            mode: 'create',
        })
    }

    const handleOnEditClick = () => {
        handleOpenEditHallPopup({
            hallData: halls[selectedHallsRowKeys[0]],
            mode: 'edit',
        })
    }

    const handleOnDeleteClick = () => {
        handleOpenDeleteHallPopup(remapKeyListToStringList(selectedHallsRowKeys))
    }

    const buttons: HallsActionsButtonType[] = useMemo(() => {
        const isAdmin = currentUser.role === 'admin'
        return optionalArray([
            (isAdmin && !selectedHallsRowKeys.length) && 'add',
            (isAdmin && selectedHallsRowKeys.length === 1) && 'edit',
            (isAdmin && !!selectedHallsRowKeys.length) && 'delete',
        ])
    }, [selectedHallsRowKeys, currentUser.role])

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
                                disabled={hallsLoading}
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
                                disabled={hallsLoading}
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
                                disabled={hallsLoading}
                            >
                                Добавить
                            </Button>
                        default:
                            checkNever(buttonType)
                            throw new Error()
                    }
                })}
            </div>
        </div>
    )
}

export {
    HallsTableCommandPanel,
}