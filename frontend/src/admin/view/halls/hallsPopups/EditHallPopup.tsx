import React from "react";
import {useAction} from "@reatom/react"
import {Input, Modal} from "antd";
import {useAtomWithSelector} from "../../../../core/reatom/useAtomWithSelector";
import {editHallPopupActions, editHallPopupAtom} from "../../../viewModel/hall/popups/editHallPopup";
import {FieldBlock} from "../../schedule/calendar/common/FieldBlock";


const fieldStyle: React.CSSProperties = {
    width: 320,
}

function HallNameInput() {
    const hallNameError = useAtomWithSelector(editHallPopupAtom, x => x.hallNameError)
    const hallName = useAtomWithSelector(editHallPopupAtom, x => x.hallName)
    const handleSetHallName = useAction(editHallPopupActions.setHallName)

    return <Input
        value={hallName || ''}
        status={hallNameError ? 'error' : ''}
        onChange={e => handleSetHallName(e.target.value)}
        style={fieldStyle}
    />
}

function HallCapacityInput() {
    const hallCapacityError = useAtomWithSelector(editHallPopupAtom, x => x.hallCapacityError)
    const hallCapacity = useAtomWithSelector(editHallPopupAtom, x => x.hallCapacity)
    const handleSetHallCapacity = useAction(editHallPopupActions.setHallCapacity)

    return <Input
        value={hallCapacity || ''}
        // min={'1'}
        status={hallCapacityError ? 'error' : ''}
        onChange={e => handleSetHallCapacity(e.target.value)}
        style={fieldStyle}
    />
}

function Content() {
    const hallNameError = useAtomWithSelector(editHallPopupAtom, x => x.hallNameError)
    const hallCapacityError = useAtomWithSelector(editHallPopupAtom, x => x.hallCapacityError)

    return (
        <>
            <FieldBlock
                title={'Название'}
                content={<HallNameInput/>}
                error={hallNameError}
            />
                <FieldBlock
                title={'Вместимость'}
                content={<HallCapacityInput/>}
                error={hallCapacityError}
            />
        </>
    )
}

function EditHallPopup() {                                                                                                                                                                                                                                                                                                                                                                                          
    const editHallPopupOpened = useAtomWithSelector(editHallPopupAtom, x => x.opened)
    const editHallPopupMode = useAtomWithSelector(editHallPopupAtom, x => x.popupMode)
    const submitButtonLoading = useAtomWithSelector(editHallPopupAtom, x => x.submitButtonLoading)
    const handleCloseEditHallPopup = useAction(editHallPopupActions.close)
    const handleSubmitHall = useAction(editHallPopupActions.submit)

    return <Modal
        title={editHallPopupMode === 'create' ? 'Добавить направление' : 'Редактировать направление'}
        open={editHallPopupOpened}
        centered
        okText={'Сохранить'}
        cancelText={'Отмена'}
        okButtonProps={{
            loading: submitButtonLoading,
            type: 'primary',
            onClick: handleSubmitHall,
        }}
        onCancel={handleCloseEditHallPopup}
        width={427}
    >
        <Content/>
    </Modal>
}

export {
    EditHallPopup,
}