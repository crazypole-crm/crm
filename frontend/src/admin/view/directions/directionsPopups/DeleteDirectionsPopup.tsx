import { useAction, useAtom } from "@reatom/react"
import { List, Modal } from "antd"
import { useAtomWithSelector } from "../../../../core/reatom/useAtomWithSelector"
import { directionsAtom } from "../../../viewModel/direction/directions"
import { deleteDirectionsPopupActions, deleteDirectionsPopupAtom } from "../../../viewModel/direction/popups/deleteDirectionsPopup"
import { submitDeleteDirectionsPopupActions } from "../../../viewModel/direction/popups/submitDeleteDirectionsPopup"
import { FieldBlock } from "../../schedule/calendar/common/FieldBlock"
import styles from './DeleteDirectionsPopup.module.css'

function Content() {
    const directions = useAtom(directionsAtom)
    const directionsIds = useAtomWithSelector(deleteDirectionsPopupAtom, x => x.directionsIds)

    return (
        <FieldBlock
            title={'Название:'}
            content={
                <List className={styles.list}
                    dataSource={directionsIds}
                    renderItem={(id: string) => (
                        <List.Item key={id}>
                            <span>{directions[id]?.name}</span>
                        </List.Item>
                    )}
                />
            }
        />
    )
}

function DeleteDirectionsPopup() {
    const deleteDirectionPopupOpened = useAtomWithSelector(deleteDirectionsPopupAtom, x => x.opened)
    const submitButtonLoading = useAtomWithSelector(deleteDirectionsPopupAtom, x => x.submitButtonLoading)
    const directionsIds = useAtomWithSelector(deleteDirectionsPopupAtom, x => x.directionsIds)
    const handleCloseDeleteDirectionPopup = useAction(deleteDirectionsPopupActions.close)
    const handleSubmitDelete = useAction(submitDeleteDirectionsPopupActions.open)

    const handleOnOkClick = () => {
        handleSubmitDelete(directionsIds)
    }

    return <Modal
        title={'Удалить направления'}
        open={deleteDirectionPopupOpened}
        centered
        okText={'Удалить'}
        cancelText={'Отмена'}
        okButtonProps={{
            loading: submitButtonLoading,
            type: 'primary',
            onClick: handleOnOkClick,
        }}
        onCancel={handleCloseDeleteDirectionPopup}
        width={430}
    >
        <Content />
    </Modal>
}

export {
    DeleteDirectionsPopup,
}