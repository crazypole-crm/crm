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
import { deleteDirectionsPopupActions } from "../../viewModel/direction/popups/deleteDirectionsPopup"
import { selectedDirectionsRowKeysAtom } from "../../viewModel/direction/popups/selectedDirectionsRows"

type DirectionsActionsButtonType = 'delete' | 'edit' | 'add' 

function remapKeyListToStringList(list: React.Key[]): string[] {
    return list.map((key) => key.toString())
}

function DirectionsTableCommandPanel() {
    const currentUser = useAtom(authorizedCurrentUser)
    const directions = useAtom(directionsAtom)
    const directionsLoading = useAtom(directionsLoadingAtom)
    const selectedDirectionsRowKeys = useAtom(selectedDirectionsRowKeysAtom)
    const handleOpenEditDirectionPopup = useAction(editDirectionPopupActions.open)
    const handleOpenDeleteDirectionPopup = useAction(deleteDirectionsPopupActions.open)

    const handleOnAddClick = () => {
        handleOpenEditDirectionPopup({
            mode: 'create',
        })
    }
    
    const handleOnEditClick = () => {
        handleOpenEditDirectionPopup({
            directionData: directions[selectedDirectionsRowKeys[0]],
            mode: 'edit',
        })
    }

    const handleOnDeleteClick = () => {
        handleOpenDeleteDirectionPopup(remapKeyListToStringList(selectedDirectionsRowKeys))
    }

    const buttons: DirectionsActionsButtonType[] = useMemo(() => {
        const isAdmin = currentUser.role === 'admin'
        return optionalArray([
            (isAdmin && !selectedDirectionsRowKeys.length) && 'add',
            (isAdmin && selectedDirectionsRowKeys.length === 1) && 'edit',
            (isAdmin && !!selectedDirectionsRowKeys.length) && 'delete',
        ])
    }, [selectedDirectionsRowKeys])

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