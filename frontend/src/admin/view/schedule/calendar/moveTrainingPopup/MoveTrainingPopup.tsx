import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {useAction} from "@reatom/react";
import {Modal} from "antd";
import React from "react";
import styles from './MoveTrainingPopup.module.css'
import {
    moveTrainingPopupActions,
    moveTrainingPopupAtom
} from "../../../../viewModel/calendar/moveTrainingPopup/moveTrainingPopup";
import {FieldBlock} from "../common/FieldBlock";
import {TrainingDatePicker} from "../common/TrainingDatePicker";
import {TrainingTimePeriod} from "../common/TrainingTimePeriod";
import {RepeatableBlock} from "../common/RepeatableBlock";

function Content() {
    const trainingDate = useAtomWithSelector(moveTrainingPopupAtom, x => x.trainingDate)
    const trainingStartTime = useAtomWithSelector(moveTrainingPopupAtom, x => x.trainingStartTime)
    const trainingEndTime = useAtomWithSelector(moveTrainingPopupAtom, x => x.trainingEndTime)
    const repeat = useAtomWithSelector(moveTrainingPopupAtom, x => x.repeat)
    const handleSetTrainingDate = useAction(moveTrainingPopupActions.setTrainingDate)
    const handleSetTrainingStartTime = useAction(moveTrainingPopupActions.setTrainingStartTime)
    const handleSetTrainingEndTime = useAction(moveTrainingPopupActions.setTrainingEndTime)
    const handleSetRepeat = useAction(moveTrainingPopupActions.setRepeat)

    return (
        <div className={styles.content}>
            <FieldBlock
                title={'Дата:'}
                content={<TrainingDatePicker
                    trainingDate={trainingDate}
                    setStrainingDate={handleSetTrainingDate}
                />}
            />
            <FieldBlock
                title={'Время:'}
                content={<TrainingTimePeriod
                    trainingStartTime={trainingStartTime}
                    trainingEndTime={trainingEndTime}
                    setTrainingStartTime={handleSetTrainingStartTime}
                    setTrainingEndTime={handleSetTrainingEndTime}
                />}
            />
            <RepeatableBlock
                repeatable={repeat}
                setRepeatable={handleSetRepeat}
            />
        </div>
    )
}


function MoveTrainingPopup() {
    const calendarMoveTrainingPopupOpened = useAtomWithSelector(moveTrainingPopupAtom, x => x.opened)
    const handleCloseMoveTrainingPopup = useAction(moveTrainingPopupActions.close)
    const handleCloseMoveTrainingSubmit = useAction(moveTrainingPopupActions.submit)

    return <Modal
        title={'Перенести занятие'}
        open={calendarMoveTrainingPopupOpened}
        centered
        okText={'Перенести'}
        cancelText={'Отмена'}
        onCancel={handleCloseMoveTrainingPopup}
        onOk={handleCloseMoveTrainingSubmit}
    >
        <Content/>
    </Modal>
}

export {
    MoveTrainingPopup,
}