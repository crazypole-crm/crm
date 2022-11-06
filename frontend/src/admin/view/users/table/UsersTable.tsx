import { Table, TablePaginationConfig } from "antd"
import { ColumnType, SorterResult, TableRowSelection } from "antd/lib/table/interface";
import { useMemo, useRef, useState } from "react";
import { useResizeObserver } from "../../../../core/hooks/useResizeObserver";
import { generateUuid } from "../../../../core/uuid/generateUuid";
import { verify } from "../../../../core/verify";
import { HEADER_HEIGHT, MARGINS, USERS_ACTION_BUTTONS_HEIGHT, USERS_TABLE_FOOTER_HEIGHT, USERS_TABLE_HEADER_HEIGHT } from "../../LayoutBlocksSize";
import { CollumnIdType, COLLUMNS, TableUserNameType, VisibleCollumsData } from "./CollumnsData";


interface DataType {
    key: string;
    name: TableUserNameType;
    birthDay: Date;
    email: string;
    phone: string;
    lastVisit: Date;
  }
  
interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
}

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  const id = generateUuid() 
  data.push({
    key: id,
    name: {
        id, 
        firstName: 'Edward',
        lastName: 'King',
        middleName: `${i}`,
    },
    birthDay: new Date(Math.round(Math.random() * 10000000000000)),
    email: 'edwardKing@mail.ru',
    phone: '89021025370',
    lastVisit: new Date(Math.round(Math.random() * 10000000000000)),
  });
}

function calcTableSize(windowHeight: number) {
    return windowHeight - HEADER_HEIGHT - MARGINS * 2 - USERS_TABLE_HEADER_HEIGHT - USERS_TABLE_FOOTER_HEIGHT - USERS_ACTION_BUTTONS_HEIGHT
}

type UsersTableProps = {
    selectedRowKeys: React.Key[],
    setSelectedRowKeys: (value: React.Key[]) => void,
    visibleCollumns: VisibleCollumsData,
}

function UsersTable({
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

    return (
        <Table
            columns={visibleCollumnsData}
            dataSource={data}
            rowSelection={rowSelection}
            pagination={tableParams.pagination}
            scroll={{
                y: tableHeight,
            }}
            onRow={onRowClick}
            onChange={handleTableChange}
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