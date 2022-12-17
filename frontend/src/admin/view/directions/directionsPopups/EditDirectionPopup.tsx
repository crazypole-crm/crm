import React from "react";
import { useAction } from "@reatom/react"
import { Input, Modal } from "antd";
import { useAtomWithSelector } from "../../../../core/reatom/useAtomWithSelector";
import { editDirectionPopupActions, editDirectionPopupAtom } from "../../../viewModel/direction/popups/editDirectionPopup";
import { FieldBlock } from "../../schedule/calendar/common/FieldBlock";


const fieldStyle: React.CSSProperties = {
    width: 320,
}

function DirectionNameInput() {
    const directionNameError = useAtomWithSelector(editDirectionPopupAtom, x => x.directionNameError)
    const directionName = useAtomWithSelector(editDirectionPopupAtom, x => x.directionName)
    const handleSetDirectionName = useAction(editDirectionPopupActions.setDirectionName)

    return <Input
        value={directionName || ''}
        status={directionNameError ? 'error' : ''}
        onChange={e => handleSetDirectionName(e.target.value)}
        style={fieldStyle}
    />
}

function Content() {
    const directionNameError = useAtomWithSelector(editDirectionPopupAtom, x => x.directionNameError)

    return (
        <FieldBlock
            title={'Название'}
            content={<DirectionNameInput/>}
            error={directionNameError}
        />
    )
}

function EditDirectionPopup() {                                                                                                                                                                                                                                                                                                                                                                                          
    const editDirectionPopupOpened = useAtomWithSelector(editDirectionPopupAtom, x => x.opened)
    const editDirectionPopupMode = useAtomWithSelector(editDirectionPopupAtom, x => x.popupMode)
    const submitButtonLoading = useAtomWithSelector(editDirectionPopupAtom, x => x.submitButtonLoading)
    const handleCloseEditDirectionPopup = useAction(editDirectionPopupActions.close)
    const handleSubmitDirection = useAction(editDirectionPopupActions.submit)

    return <Modal
        title={editDirectionPopupMode === 'create' ? 'Добавить направление' : 'Редактировать направление'}
        open={editDirectionPopupOpened}
        centered
        okText={'Сохранить'}
        cancelText={'Отмена'}
        okButtonProps={{
            loading: submitButtonLoading,
            type: 'primary',
            onClick: handleSubmitDirection,
        }}
        onCancel={handleCloseEditDirectionPopup}
        width={427}
    >
        <Content/>
    </Modal>
}

export {
    EditDirectionPopup,
}