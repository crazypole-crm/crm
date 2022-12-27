import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {useAction, useAtom} from "@reatom/react";
import {Button, Checkbox, Empty, Modal, Table} from "antd";
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
import {recordToTrainingPopupActions} from "../../../../viewModel/calendar/recordToTrainingPopup/recordToTrainingPopup";

interface DataType {
    key: string;
    name: string;
    attendance: boolean,
}

const COLUMNS: ColumnsType<DataType> = [
    {
        title: 'Посещаемость',
        dataIndex: 'attendance',
        render: (attendance, record: DataType) => <AttendanceCell value={attendance} registrationId={record.key}/>,
        width: 132
    },
    {
        title: 'Клиент',
        dataIndex: 'name',
        render: name => name,
        defaultSortOrder: 'ascend'
    },
    {
        title: '',
        dataIndex: 'delete',
        render: (_, record: DataType) => <DeleteRegistrationCell registrationId={record.key} />,
        width: 100,
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
        checked={value}
        onChange={e => handleMarkClientAttendance({registrationId, attendance: !value})}
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
        pagination={false}
        showSorterTooltip={false}
    />
}

function RegistrationTableWrapper() {
    const registrationsData = useAtomWithSelector(clientsTrainingPopupAtom, x => x.registrationsData)
    const trainingId = useAtomWithSelector(clientsTrainingPopupAtom, x => x.trainingId)
    const handleOpenRecordToTrainingPopup = useAction(recordToTrainingPopupActions.open)
    const handleCloseTrainingClientsPopup = useAction(clientsTrainingPopupActions.close)

    if (!registrationsData.length) {
        return <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
                height: 60,
            }}
            description={'На это занятие еще нет записанных пользователей'}
        >
            <Button
                type={'primary'}
                onClick={() => {
                    handleCloseTrainingClientsPopup()
                    handleOpenRecordToTrainingPopup({
                        trainingId,
                        fromClientsPopup: true,
                    })
                }}
            >
                Записать пользователя
            </Button>
        </Empty>
    }

    return <RegistrationsTable />
}

function ContentWrapper() {
    const popupLoading = useAtomWithSelector(clientsTrainingPopupAtom, x => x.popupLoading)
    return (
        <div className={styles.contentWrapper}>
            {
                popupLoading
                    ? <Preloader size={'normal'} />
                    : <RegistrationTableWrapper />
            }
        </div>
    )
}


function TrainingClientsPopup() {
    const calendarClientsTrainingPopupOpened = useAtomWithSelector(clientsTrainingPopupAtom, x => x.opened)
    const handleClosePopup = useAction(clientsTrainingPopupActions.close)

    return <Modal
        title={'Записанные клиенты'}
        open={calendarClientsTrainingPopupOpened}
        centered
        footer={null}
        onCancel={handleClosePopup}
        width={620}
    >
        <ContentWrapper />
    </Modal>
}

export {
    TrainingClientsPopup,
}