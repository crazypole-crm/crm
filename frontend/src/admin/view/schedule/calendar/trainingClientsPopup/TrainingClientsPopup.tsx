import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {useAction, useAtom} from "@reatom/react";
import {Checkbox, Modal, Table} from "antd";
import React, {useMemo} from "react";
import {
    clientsTrainingPopupActions,
    clientsTrainingPopupAtom
} from "../../../../viewModel/calendar/trainingClientsPopup/trainingClientsPopup";
import {ColumnsType} from "antd/lib/table";
import {UserData} from "../../../../viewModel/users/UserData";
import {verify} from "../../../../../core/verify";
import {getFullName} from "../../../../../common/name";
import {clientsAtom} from "../../../../viewModel/users/users";

interface DataType {
    key: string;
    name: string;
    attendance: {
        clientId: string,
        value: boolean,
    },
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
        render: attendance => <AttendanceCell value={attendance.value} clientId={attendance.clientId}/>,
        width: 135
    },
];

type AttendanceCellProps = {
    clientId: string,
    value: boolean,
}

function AttendanceCell({
    clientId,
    value,
}: AttendanceCellProps) {
    const handleMarkClientAttendance = useAction(clientsTrainingPopupActions.markClientAttendance)

    return <Checkbox
        value={value}
        onChange={e => handleMarkClientAttendance({clientId, attendance: e.target.value})}
    />
}

function remapClientsDataToTableData(clients: UserData[], clientsAttendance: Map<string, boolean>): DataType[] {
    return Array.from(clientsAttendance.keys()).map(clientId => {
        const clientData = verify(clients.find(clientIdItem => clientIdItem.id === clientId))
        return {
            key: clientId,
            attendance: {
                clientId: clientId,
                value: verify(clientsAttendance.get(clientId))
            },
            name: getFullName({
                firstName: clientData.firstName,
                lastName: clientData.lastName,
                middleName: clientData.middleName,
            }) || clientData.email,
        }
    })
}

function ClientsTable() {
    const clientsData = useAtomWithSelector(clientsTrainingPopupAtom, x => x.clientsData)
    const clientsLoading = useAtomWithSelector(clientsTrainingPopupAtom, x => x.clientsLoading)
    const clients = useAtom(clientsAtom)

    const data = useMemo(() => clientsData && remapClientsDataToTableData(clients, clientsData), [clientsData, clients])

    return <Table
        columns={COLUMNS}
        dataSource={data || []}
        scroll={{
            y: 600,
        }}
        pagination={false}
        loading={clientsLoading}
    />
}

function TrainingClientsPopup() {
    const calendarClientsTrainingPopupOpened = useAtomWithSelector(clientsTrainingPopupAtom, x => x.opened)
    const handleCloseClientsTrainingPopup = useAction(clientsTrainingPopupActions.close)
    const handleSubmitClientsTrainingSubmit = useAction(clientsTrainingPopupActions.submit)

    return <Modal
        title={'Записанные клиенты'}
        open={calendarClientsTrainingPopupOpened}
        centered
        okText={'Сохранить'}
        cancelText={'Отмена'}
        onCancel={handleCloseClientsTrainingPopup}
        onOk={handleSubmitClientsTrainingSubmit}
    >
        <ClientsTable />
    </Modal>
}

export {
    TrainingClientsPopup,
}