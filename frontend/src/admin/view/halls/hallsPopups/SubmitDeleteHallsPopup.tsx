import { useAction } from "@reatom/react"
import { Modal } from "antd"
import { useAtomWithSelector } from "../../../../core/reatom/useAtomWithSelector"
import { submitDeleteHallsPopupActions, submitDeleteHallsPopupAtom } from "../../../viewModel/hall/popups/submitDeleteHallsPopup"

function SubmitDeleteHallsPopup() {                                                                                                                                                                                                                                                                                                                                                                                          
    const submitDeleteHallPopupOpened = useAtomWithSelector(submitDeleteHallsPopupAtom, x => x.opened)
    const hallsIds = useAtomWithSelector(submitDeleteHallsPopupAtom, x => x.hallsIds)
    const handleCloseSubmitDeleteHallPopup = useAction(submitDeleteHallsPopupActions.close)
    const handleSubmitDelete = useAction(submitDeleteHallsPopupActions.submit)

    return <Modal
        title={'Удалить зал' + ((hallsIds.length > 1) ? 'ы' : '')}
        open={submitDeleteHallPopupOpened}
        centered
        okText={'Удалить'}
        cancelText={'Отмена'}
        onOk={handleSubmitDelete}
        onCancel={handleCloseSubmitDeleteHallPopup}
        width={535}
    >
        <span>
            {'Будут удалены все события, связанные с зал' + ((hallsIds.length > 1) ? 'ами' : 'ом') + '!'}
        </span>
    </Modal>
}

export {
    SubmitDeleteHallsPopup,
}