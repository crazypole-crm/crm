import { useAction, useAtom } from "@reatom/react"
import { List, Modal } from "antd"
import { useAtomWithSelector } from "../../../../core/reatom/useAtomWithSelector"
import { hallsAtom } from "../../../viewModel/hall/halls"
import { deleteHallsPopupActions, deleteHallsPopupAtom } from "../../../viewModel/hall/popups/deleteHallsPopup"
import { submitDeleteHallsPopupActions } from "../../../viewModel/hall/popups/submitDeleteHallsPopup"
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
    const submitButtonLoading = useAtomWithSelector(deleteHallsPopupAtom, x => x.submitButtonLoading)
    const hallsIds = useAtomWithSelector(deleteHallsPopupAtom, x => x.hallsIds)
    const handleCloseDeleteHallPopup = useAction(deleteHallsPopupActions.close)
    const handleSubmitDelete = useAction(submitDeleteHallsPopupActions.open)

    const handleOnOkClick = () => {
        handleSubmitDelete(hallsIds)
    }

    return <Modal
        title={'Удалить залы'}
        open={deleteHallPopupOpened}
        centered
        okText={'Удалить'}
        cancelText={'Отмена'}
        okButtonProps={{
            loading: submitButtonLoading,
            type: 'primary',
            onClick: handleOnOkClick,
        }}
        onCancel={handleCloseDeleteHallPopup}
        width={430}
    >
        <Content />
    </Modal>
}

export {
    DeleteHallsPopup,
}