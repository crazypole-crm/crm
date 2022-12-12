import { useAction } from "@reatom/react"
import { Modal } from "antd"
import { useAtomWithSelector } from "../../../../core/reatom/useAtomWithSelector"
import { deleteUser } from "../../../viewModel/users/deleteUser"
import { submitDeleteUsersPopupActions, submitDeleteUsersPopupAtom } from "../../../viewModel/users/submitDeleteUserPopup/submitDeleteUsersPopup"

function SubmitDeleteUsersPopup() {                                                                                                                                                                                                                                                                                                                                                                                          
    const submitDeleteUserPopupOpened = useAtomWithSelector(submitDeleteUsersPopupAtom, x => x.opened)
    const usersIds = useAtomWithSelector(submitDeleteUsersPopupAtom, x => x.usersIds)
    const handleCloseSubmitDeleteUserPopup = useAction(submitDeleteUsersPopupActions.close)
    const handleDeleteUser = useAction(deleteUser)

    const handleOnOKClick = () => {
        handleDeleteUser(usersIds as string[])
    }

    return <Modal
        title={'Удалить пользовател' + ((usersIds.length > 1) ? 'ей' : 'я')}
        open={submitDeleteUserPopupOpened}
        centered
        okText={'Удалить'}
        cancelText={'Отмена'}
        onOk={handleOnOKClick}
        onCancel={handleCloseSubmitDeleteUserPopup}
        width={535}
    >
        <span>
            {'Будут удалены все события, связанные с пользовател' + ((usersIds.length > 1) ? 'ями' : 'ем') + '!'}
        </span>
    </Modal>
}

export {
    SubmitDeleteUsersPopup,
}