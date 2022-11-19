import { useAction } from "@reatom/react"
import { Modal } from "antd"
import { useAtomWithSelector } from "../../../../core/reatom/useAtomWithSelector"
import { deleteDirectionPopupActions, deleteDirectionPopupAtom } from "../../../viewModel/direction/popups/deleteDirectionsPopup"

function DeleteDirectionsPopup() {                                                                                                                                                                                                                                                                                                                                                                                          
    const deleteDirectionPopupOpened = useAtomWithSelector(deleteDirectionPopupAtom, x => x.opened)
    const handleCloseDeleteDirectionPopup = useAction(deleteDirectionPopupActions.close)
    const handleSubmitDelete = useAction(deleteDirectionPopupActions.submit)

    return <Modal
        title={'Удалить направления?'}
        open={deleteDirectionPopupOpened}
        centered
        okText={'Подтвердить'}
        cancelText={'Отмена'}
        onOk={handleSubmitDelete}
        onCancel={handleCloseDeleteDirectionPopup}
        width={348}
    >
    </Modal>
}

export {
    DeleteDirectionsPopup,
}