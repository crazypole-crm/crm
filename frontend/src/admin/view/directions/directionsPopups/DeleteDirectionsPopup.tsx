import { useAction, useAtom } from "@reatom/react"
import { List, Modal } from "antd"
import { useAtomWithSelector } from "../../../../core/reatom/useAtomWithSelector"
import { directionsAtom } from "../../../viewModel/direction/directions"
import { deleteDirectionsPopupActions, deleteDirectionsPopupAtom } from "../../../viewModel/direction/popups/deleteDirectionsPopup"
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
    const handleCloseDeleteDirectionPopup = useAction(deleteDirectionsPopupActions.close)
    const handleSubmitDelete = useAction(deleteDirectionsPopupActions.submit)

    return <Modal
        title={'Удалить направления'}
        open={deleteDirectionPopupOpened}
        centered
        okText={'Удалить'}
        cancelText={'Отмена'}
        onOk={handleSubmitDelete}
        onCancel={handleCloseDeleteDirectionPopup}
        width={430}
    >
        <Content />
    </Modal>
}

export {
    DeleteDirectionsPopup,
}