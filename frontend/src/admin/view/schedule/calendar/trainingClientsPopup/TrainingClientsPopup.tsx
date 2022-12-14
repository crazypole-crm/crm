import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {useAction, useAtom} from "@reatom/react";
import {Button, Checkbox, Modal, Table} from "antd";
import React, {useMemo} from "react";
import {
    clientsTrainingPopupActions,
    clientsTrainingPopupAtom, RegistrationData
} from "../../../../viewModel/calendar/trainingClientsPopup/trainingClientsPopup";
import {ColumnsType} from "antd/lib/table";
import {UserData} from "../../../../viewModel/users/UserData";
import {verify} from "../../../../../core/verify";
import {getFullName} from "../../../../../common/name";
import {clientsAtom} from "../../../../viewModel/users/users";
import styles from './TrainingClientsPopup.module.css'
import {Preloader} from "../../../../../common/preloader/Preloader";

interface DataType {
    key: string;
    name: string;
    attendance: boolean,
}

const COLUMNS: ColumnsType<DataType> = [
    {
        title: 'Клиент',
        dataIndex: 'name',
        render: name => name,
        defaultSortOrder: 'ascend'
    },
    {
        title: 'Посещаемость',
        dataIndex: 'attendance',
        render: (attendance, record: DataType) => <AttendanceCell value={attendance} registrationId={record.key}/>,
        width: 135
    },
    {
        title: '',
        dataIndex: 'delete',
        render: (_, record: DataType) => <DeleteRegistrationCell registrationId={record.key} />
    }
];

type AttendanceCellProps = {
    registrationId: string,
    value: boolean,
}

function AttendanceCell({
    registrationId,
    value,
}: AttendanceCellProps) {
    const handleMarkClientAttendance = useAction(clientsTrainingPopupActions.markClientAttendance)

    return <Checkbox
        value={value}
        onChange={e => handleMarkClientAttendance({registrationId, attendance: e.target.value})}
    />
}

type DeleteRegistrationCellProps = {
    registrationId: string,
}

function DeleteRegistrationCell({
    registrationId,
}: DeleteRegistrationCellProps) {
    const handleDeleteRegistration = useAction(clientsTrainingPopupActions.removeRegistration)
    return <Button
        type={'primary'}
        onClick={() => handleDeleteRegistration(registrationId)}
    >
        Удалить
    </Button>
}

function remapClientsDataToTableData(registrationsData: RegistrationData[], clients: UserData[]): DataType[] {
    return registrationsData.map(registrationData => {
        const clientData = verify(clients.find(clientIdItem => clientIdItem.id === registrationData.userId))
        return {
            key: registrationData.id,
            attendance: registrationData.attended,
            name: getFullName({
                firstName: clientData.firstName,
                lastName: clientData.lastName,
                middleName: clientData.middleName,
            }) || clientData.email,
        }
    })
}

function RegistrationsTable() {
    const registrationsData = useAtomWithSelector(clientsTrainingPopupAtom, x => x.registrationsData)
    const clients = useAtom(clientsAtom)

    const data = useMemo(() => remapClientsDataToTableData(registrationsData, clients), [registrationsData, clients])

    return <Table
        columns={COLUMNS}
        dataSource={data || []}
        scroll={{
            y: 600,
        }}
        pagination={false}
        showSorterTooltip={false}
    />
}

function ContentWrapper() {
    const popupLoading = useAtomWithSelector(clientsTrainingPopupAtom, x => x.popupLoading)
    return (
        <div className={styles.contentWrapper}>
            {
                popupLoading
                    ? <Preloader size={'small'} />
                    : <RegistrationsTable />
            }
        </div>
    )
}


function TrainingClientsPopup() {
    const calendarClientsTrainingPopupOpened = useAtomWithSelector(clientsTrainingPopupAtom, x => x.opened)

    return <Modal
        title={'Записанные клиенты'}
        open={calendarClientsTrainingPopupOpened}
        centered
        footer={() => null}
    >
        <ContentWrapper />
    </Modal>
}

export {
    TrainingClientsPopup,
}