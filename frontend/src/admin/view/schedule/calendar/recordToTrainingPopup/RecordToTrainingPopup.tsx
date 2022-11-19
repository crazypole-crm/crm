import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {useAction, useAtom} from "@reatom/react";
import {Modal, Select} from "antd";
import React from "react";
import {
    recordToTrainingPopupActions,
    recordToTrainingPopupAtom
} from "../../../../viewModel/calendar/recordToTrainingPopup/recordToTrainingPopup";
import {getFullName} from "../../../../../common/name";
import {clientsAtom} from "../../../../viewModel/users/users";
import styles from './RecordToTrainingPopup.module.css';

function Content() {
    const selectedUserId = useAtomWithSelector(recordToTrainingPopupAtom, x => x.selectedUserId)
    const clients = useAtom(clientsAtom)
    const handleSetSelectedUserId = useAction(recordToTrainingPopupActions.setSelectedUserId)

    const clientsOption = clients.map(client => ({
        value: client.id,
        label: getFullName(client) || client.email,
    }))

    return (
        <div className={styles.content}>
            <Select
                placeholder={'Пользователь'}
                showSearch={true}
                value={selectedUserId}
                onChange={id => handleSetSelectedUserId(id)}
                options={clientsOption}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                style={{
                    width: '100%',
                }}
            />
        </div>
    )
}

function RecordToTrainingPopup() {
    const recordToTrainingPopupOpened = useAtomWithSelector(recordToTrainingPopupAtom, x => x.opened)
    const handleCloseRecordToTraining = useAction(recordToTrainingPopupActions.close)
    const handleSubmitRecordToTraining = useAction(recordToTrainingPopupActions.submit)

    return <Modal
        title={'Записать на занятие'}
        open={recordToTrainingPopupOpened}
        centered
        okText={'Записать'}
        cancelText={'Отмена'}
        onCancel={handleCloseRecordToTraining}
        onOk={handleSubmitRecordToTraining}
    >
        <Content/>
    </Modal>
}

export {
    RecordToTrainingPopup,
}