import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {useAction} from "@reatom/react";
import {Modal} from "antd";
import React from "react";
import {TrainingInfo} from "../common/TrainingInfo";
import {
    trainingActionPopupActions,
    trainingActionPopupAtom
} from "../../../../viewModel/calendar/trainingActionPopup/trainingActionPopup";
import {getValueByCheckedKey} from "../../../../../core/getValueByCheckedKey";

function TrainingActionPopup() {
    const calendarTrainingActionPopupOpened = useAtomWithSelector(trainingActionPopupAtom, x => x.opened)
    const trainingData = useAtomWithSelector(trainingActionPopupAtom, x => x.trainingData)
    const mode = useAtomWithSelector(trainingActionPopupAtom, x => x.mode)
    const submitButtonLoading = useAtomWithSelector(trainingActionPopupAtom, x => x.submitButtonLoading)
    const handleCloseTrainingActionPopup = useAction(trainingActionPopupActions.close)
    const handleSubmitTrainingAction = useAction(trainingActionPopupActions.submit)

    const popupTitle = getValueByCheckedKey(mode, {
        'delete': 'Удалить занятие',
        'cancel': 'Отменить занятие',
        'record': 'Записаться на занятие',
        'unsubscribe': 'Информация о занятии',
    })

    const okButtonText = getValueByCheckedKey(mode, {
        'delete': 'Удалить занятие',
        'cancel': 'Отменить занятие',
        'record': 'Записаться на занятие',
        'unsubscribe': 'Отписаться от занятия',
    })

    return <Modal
        title={popupTitle}
        open={calendarTrainingActionPopupOpened}
        centered
        okText={okButtonText}
        cancelText={'Отмена'}
        onCancel={handleCloseTrainingActionPopup}
        okButtonProps={{
            loading: submitButtonLoading,
            type: 'primary',
            onClick: handleSubmitTrainingAction,
        }}
    >
        <TrainingInfo trainingData={trainingData}/>
    </Modal>
}

export {
    TrainingActionPopup,
}