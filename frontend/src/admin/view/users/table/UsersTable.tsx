import { Table, TablePaginationConfig } from "antd"
import { ColumnType, SorterResult, TableRowSelection } from "antd/lib/table/interface";
import { useMemo, useRef, useState } from "react";
import { useResizeObserver } from "../../../../core/hooks/useResizeObserver";
import { generateUuid } from "../../../../core/uuid/generateUuid";
import { verify } from "../../../../core/verify";
import { HEADER_HEIGHT, MARGINS, USERS_ACTION_BUTTONS_HEIGHT, USERS_TABLE_FOOTER_HEIGHT, USERS_TABLE_HEADER_HEIGHT } from "../../LayoutBlocksSize";
import { CollumnIdType, COLLUMNS, TableUserNameType, VisibleCollumsData } from "./CollumnsData";
import {UserData, UserRole} from "../../../viewModel/users/UserData";


interface DataType {
    key: string;
    name: TableUserNameType;
    birthDay?: Date;
    email: string;
    phone?: string;
    lastVisit?: Date;
    role: UserRole,
  }
  
interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
}

function remapUsersDataToTableData(usersData: UserData[]): DataType[] {
    return usersData.map(user => ({
        key: user.id,
        name: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
        },
        birthDay: user.birthDay,
        email: user.email,
        lastVisit: user.lastVisit,
        phone: user.phone,
        role: user.role,
    }))
}

function calcTableSize(windowHeight: number) {
    return windowHeight - HEADER_HEIGHT - MARGINS * 2 - USERS_TABLE_HEADER_HEIGHT - USERS_TABLE_FOOTER_HEIGHT - USERS_ACTION_BUTTONS_HEIGHT
}

type UsersTableProps = {
    usersData: UserData[] | null,
    selectedRowKeys: React.Key[],
    setSelectedRowKeys: (value: React.Key[]) => void,
    visibleCollumns: VisibleCollumsData,
}

function UsersTable({
    usersData,
    selectedRowKeys,
    setSelectedRowKeys,
    visibleCollumns,
}: UsersTableProps) {
    const windowRef = useRef(document.body)

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
          current: 1,
          pageSize: 10,
          position: ['bottomCenter'],
        },
        sortField: 'name'
      });

    const handleTableChange = (
        pagination: TablePaginationConfig,
        sorter: SorterResult<DataType> | SorterResult<DataType>[],
      ) => {
        setTableParams({
            pagination,
            ...sorter,
        });
    };

    const [, windowHeight] = useResizeObserver(windowRef)

    const tableHeight = useMemo(() => calcTableSize(windowHeight), [windowHeight])

    const onRowClick = (record: DataType) => {
        return {
            onClick: () => {
                if (selectedRowKeys.includes(record.key)) {
                    setSelectedRowKeys(selectedRowKeys.filter(key => key !== record.key))
                }
                else {
                    setSelectedRowKeys([...selectedRowKeys, record.key])
                }
            }
        }
    }

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
        columnWidth: 60
    }

    const visibleCollumnsData = COLLUMNS.filter(collumn => {
        const collumnId = verify((collumn as ColumnType<DataType>).dataIndex) as CollumnIdType
        return visibleCollumns[collumnId]
    })

    const data = useMemo(() => usersData && remapUsersDataToTableData(usersData), [usersData])

    return (
        <Table
            columns={visibleCollumnsData}
            dataSource={data || []}
            rowSelection={rowSelection}
            pagination={tableParams.pagination}
            scroll={{
                y: tableHeight,
            }}
            onRow={onRowClick}
            onChange={handleTableChange}
            loading={!usersData}
        />
    )
}

export type {
    CollumnIdType,
    DataType,
}

export {
    UsersTable,
}