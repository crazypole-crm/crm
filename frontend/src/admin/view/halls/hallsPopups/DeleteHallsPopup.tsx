import { useAction, useAtom } from "@reatom/react"
import { List, Modal } from "antd"
import { useAtomWithSelector } from "../../../../core/reatom/useAtomWithSelector"
import { hallsAtom } from "../../../viewModel/hall/halls"
import { deleteHallsPopupActions, deleteHallsPopupAtom } from "../../../viewModel/hall/popups/deleteHallsPopup"
import { FieldBlock } from "../../schedule/calendar/common/FieldBlock"
import styles from './DeleteHallsPopup.module.css'

function Content() {
    const halls = useAtom(hallsAtom)
    const hallsIds = useAtomWithSelector(deleteHallsPopupAtom, x => x.hallsIds)

    return (
        <FieldBlock
            title={'Название:'}
            content={
                <List className={styles.list}
                    dataSource={hallsIds}
                    renderItem={(id: string) => (
                        <List.Item key={id}>
                            <span>{halls[id]?.name}</span>
                        </List.Item>
                    )}
                />
            }
        />
    )
}

function DeleteHallsPopup() {                                                                                                                                                                                                                                                                                                                                                                                          
    const deleteHallPopupOpened = useAtomWithSelector(deleteHallsPopupAtom, x => x.opened)
    const handleCloseDeleteHallPopup = useAction(deleteHallsPopupActions.close)
    const handleSubmitDelete = useAction(deleteHallsPopupActions.submit)

    return <Modal
        title={'Удалить направления'}
        open={deleteHallPopupOpened}
        centered
        okText={'Удалить'}
        cancelText={'Отмена'}
        onOk={handleSubmitDelete}
        onCancel={handleCloseDeleteHallPopup}
        width={430}
    >
        <Content />
    </Modal>
}

export {
    DeleteHallsPopup,
}