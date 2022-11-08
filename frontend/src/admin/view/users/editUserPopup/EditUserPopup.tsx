import { useAction } from "@reatom/react"
import { editUserPopupActions } from "../../../viewModel/editUserPopup/editUserPopup"
import { Popup } from "../../../../common/popup/Popup"

function ContentWrapper() {
    return (
        <div>
            Edit User
        </div>
    )
}

function EditUserPopup() {
    const handleCloseEditUserPopup = useAction(editUserPopupActions.close)

    return <Popup
        type={'contentOnly'}
        content={<ContentWrapper />}
        closePopup={() => handleCloseEditUserPopup()}
    />
}

export {
    EditUserPopup,
}