import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons"
import { useAction, useAtom } from "@reatom/react"
import { Button } from "antd"
import React, { useMemo } from "react"
import { optionalArray } from "../../../core/array/array"
import { checkNever } from "../../../core/checkNever"
import { authorizedCurrentUser } from "../../../currentUser/currentUser"
import { directionsAtom } from "../../viewModel/direction/directions"
import { editDirectionPopupActions } from "../../viewModel/direction/popups/editDirectionPopup"
import { directionsLoadingAtom } from "../../viewModel/direction/loadDirections"
import styles from '../users/table/UsersTableCommandPanel.module.css'
import { deleteDirectionPopupActions } from "../../viewModel/direction/popups/deleteDirectionsPopup"

type DirectionsActionsButtonType = 'delete' | 'edit' | 'add' 

type DirectionsActionsButtonProps = {
    selectedRowKeys: React.Key[],
}

function remapKeyListToStringList(list: React.Key[]): string[] {
    return list.map((key) => key.toString())
}

function DirectionsTableCommandPanel({
    selectedRowKeys,
}: DirectionsActionsButtonProps) {
    const currentUser = useAtom(authorizedCurrentUser)
    const directions = useAtom(directionsAtom)
    const directionsLoading = useAtom(directionsLoadingAtom)
    const handleOpenEditDirectionPopup = useAction(editDirectionPopupActions.open)
    const handleOpenDeleteDirectionPopup = useAction(deleteDirectionPopupActions.open)

    const handleOnAddClick = () => {
        handleOpenEditDirectionPopup({
            mode: 'create',
        })
    }
    
    const handleOnEditClick = () => {
        handleOpenEditDirectionPopup({
            directionData: directions[selectedRowKeys[0]],
            mode: 'edit',
        })
    }

    const handleOnDeleteClick = () => {
        handleOpenDeleteDirectionPopup(remapKeyListToStringList(selectedRowKeys))
    }

    const buttons: DirectionsActionsButtonType[] = useMemo(() => {
        const isAdmin = currentUser.role === 'admin'
        return optionalArray([
            (isAdmin && !selectedRowKeys.length) && 'add',
            (isAdmin && selectedRowKeys.length === 1) && 'edit',
            (isAdmin && !!selectedRowKeys.length) && 'delete',
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
                                disabled={directionsLoading}
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
                                disabled={directionsLoading}
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
                                disabled={directionsLoading}
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
    DirectionsTableCommandPanel,
}