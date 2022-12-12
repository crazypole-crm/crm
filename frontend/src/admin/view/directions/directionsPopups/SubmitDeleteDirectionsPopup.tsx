import { useAction } from "@reatom/react"
import { Modal } from "antd"
import { useAtomWithSelector } from "../../../../core/reatom/useAtomWithSelector"
import { submitDeleteDirectionsPopupActions, submitDeleteDirectionsPopupAtom } from "../../../viewModel/direction/popups/submitDeleteDirectionsPopup"

function SubmitDeleteDirectionsPopup() {                                                                                                                                                                                                                                                                                                                                                                                          
    const submitDeleteDirectionPopupOpened = useAtomWithSelector(submitDeleteDirectionsPopupAtom, x => x.opened)
    const directionsIds = useAtomWithSelector(submitDeleteDirectionsPopupAtom, x => x.directionsIds)
    const handleCloseSubmitDeleteDirectionPopup = useAction(submitDeleteDirectionsPopupActions.close)
    const handleSubmitDelete = useAction(submitDeleteDirectionsPopupActions.submit)

    return <Modal
        title={'Удалить направлени' + ((directionsIds.length > 1) ? 'я' : 'е')}
        open={submitDeleteDirectionPopupOpened}
        centered
        okText={'Удалить'}
        cancelText={'Отмена'}
        onOk={handleSubmitDelete}
        onCancel={handleCloseSubmitDeleteDirectionPopup}
        width={535}
    >
        <span>
            {'Будут удалены все события, связанные с направлени' + ((directionsIds.length > 1) ? 'ями' : 'ем') + '!'}
        </span>
    </Modal>
}

export {
    SubmitDeleteDirectionsPopup,
}