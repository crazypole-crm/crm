import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {useAction} from "@reatom/react";
import {Modal} from "antd";
import React from "react";
import {
    replaceTrainerPopupActions,
    replaceTrainerPopupAtom
} from "../../../../viewModel/calendar/replaceTrainerPopup/replaceTrainer";
import styles from './ReplaceTrainerPopup.module.css'
import {FieldBlock} from "../common/FieldBlock";
import {TrainingTrainer} from "../common/TrainingTrainer";
import {RepeatableBlock} from "../common/RepeatableBlock";


function Content() {
    const trainerId = useAtomWithSelector(replaceTrainerPopupAtom, x => x.trainerId)
    const repeat = useAtomWithSelector(replaceTrainerPopupAtom, x => x.repeat)
    const handleSetTrainerId = useAction(replaceTrainerPopupActions.setTrainerId)
    const handleSetRepeat = useAction(replaceTrainerPopupActions.setRepeat)
    return (
        <div className={styles.content}>
            <FieldBlock
                title={'Преподаватель'}
                content={<TrainingTrainer
                    trainerId={trainerId}
                    setTrainerId={handleSetTrainerId}
                />}
            />
            <RepeatableBlock
                repeatable={repeat}
                setRepeatable={handleSetRepeat}
            />
        </div>
    )
}

function ReplaceTrainerPopup() {
    const calendarReplaceTrainerPopupOpened = useAtomWithSelector(replaceTrainerPopupAtom, x => x.opened)
    const submitButtonLoading = useAtomWithSelector(replaceTrainerPopupAtom, x => x.submitButtonLoading)
    const handleCloseReplaceTrainerPopup = useAction(replaceTrainerPopupActions.close)
    const handleSubmitReplaceTrainer = useAction(replaceTrainerPopupActions.submit)

    return <Modal
        title={'Заменить преподавателя'}
        open={calendarReplaceTrainerPopupOpened}
        centered
        okText={'Сохранить'}
        cancelText={'Отмена'}
        onCancel={handleCloseReplaceTrainerPopup}
        okButtonProps={{
            loading: submitButtonLoading,
            type: 'primary',
            onClick: handleSubmitReplaceTrainer,
        }}
    >
        <Content/>
    </Modal>
}

export {
    ReplaceTrainerPopup,
}