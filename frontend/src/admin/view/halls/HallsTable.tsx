import { useAction, useAtom } from "@reatom/react";
import {Table, TablePaginationConfig} from "antd"
import {ColumnsType, SorterResult, TableRowSelection} from "antd/lib/table/interface";
import {useMemo, useRef, useState} from "react";
import {useResizeObserver} from "../../../core/hooks/useResizeObserver";
import { HallData } from "../../viewModel/hall/HallData";
import { selectedHallsRowKeysAtom, setSelectedHallsRowKeys } from "../../viewModel/hall/popups/selectedHallsRows";
import {
    HEADER_HEIGHT,
    MARGINS,
    USERS_ACTION_BUTTONS_HEIGHT,
    USERS_TABLE_FOOTER_HEIGHT,
    USERS_TABLE_HEADER_HEIGHT
} from "../LayoutBlocksSize";
import { stringValuesCompare } from "../users/table/userTableDataSort";
import { HallsTableNameCell } from "./HallsTableNameCell";

interface DataType {
    key: string;
    name: string;
    capacity: number;
}

const columns: ColumnsType<DataType> = [
    {
      title: 'Название',
      dataIndex: 'name',
      render: (_: any, record: DataType) => <HallsTableNameCell id={record.key} name={record.name}/>,
      sorter: (a, b) => stringValuesCompare(a.name, b.name),
    },
    {
        title: 'Вместимость',
        dataIndex: 'capacity',
        render: (_: any, record: DataType) => <span>{record.capacity}</span>,
        sorter: (a, b) => b.capacity - a.capacity,
      },
];
  
interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
}

function remapHallDataToTableData(hallsData: HallData[]): DataType[] {
    return hallsData.map(hall => ({
        key: hall.id,
        ...hall
    }))
}

function calcTableSize(windowHeight: number) {
    return windowHeight - HEADER_HEIGHT - MARGINS * 2 - USERS_TABLE_HEADER_HEIGHT - USERS_TABLE_FOOTER_HEIGHT - USERS_ACTION_BUTTONS_HEIGHT
}

type HallsTableProps = {
    hallsData: HallData[] | null,
}

function HallsTable({
    hallsData,
}: HallsTableProps) {
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

    const selectedHallsRowKeys = useAtom(selectedHallsRowKeysAtom)
    const handleSetSelectedHallsRowKeys= useAction(setSelectedHallsRowKeys)

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys: selectedHallsRowKeys,
        onChange: handleSetSelectedHallsRowKeys,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
        columnWidth: 60
    }

    const data = useMemo(() => hallsData && remapHallDataToTableData(hallsData), [hallsData])

    const onRowClick = (record: DataType) => {
        return {
            onClick: () => {
                if (selectedHallsRowKeys.includes(record.key)) {
                    handleSetSelectedHallsRowKeys(selectedHallsRowKeys.filter(key => key !== record.key))
                }
                else {
                    handleSetSelectedHallsRowKeys([...selectedHallsRowKeys, record.key])
                }
            }
        }
    }

    return (
        <Table
            columns={columns}
            dataSource={data || []}
            rowSelection={rowSelection}
            pagination={tableParams.pagination}
            scroll={{
                y: tableHeight,
            }}
            onChange={handleTableChange}
            onRow={onRowClick}
            loading={!hallsData}
            style={{
                borderRadius: 10,
                background: "#ffffff"
            }}
        />
    )
}

export {
    HallsTable,
}