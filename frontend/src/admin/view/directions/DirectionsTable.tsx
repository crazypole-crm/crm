import {Table, TablePaginationConfig} from "antd"
import {ColumnsType, SorterResult, TableRowSelection} from "antd/lib/table/interface";
import {useMemo, useRef, useState} from "react";
import {useResizeObserver} from "../../../core/hooks/useResizeObserver";
import {
    HEADER_HEIGHT,
    MARGINS,
    USERS_ACTION_BUTTONS_HEIGHT,
    USERS_TABLE_FOOTER_HEIGHT,
    USERS_TABLE_HEADER_HEIGHT
} from "../LayoutBlocksSize";
import { DirectionData } from "../../viewModel/direction/DirectionData";
import { stringValuesCompare } from "../users/table/userTableDataSort";
import { DirectionsTableNameCell } from "./DirectionsTableNameCell";
import { selectedDirectionsRowKeysAtom, setSelectedDirectionsRowKeys } from "../../viewModel/direction/popups/selectedDirectionsRows";
import { useAction, useAtom } from "@reatom/react";


interface DataType {
    key: string;
    name: string;
}

const columns: ColumnsType<DataType> = [
    {
      title: 'Направление',
      dataIndex: 'name',
      render: (_: any, record: DataType) => <DirectionsTableNameCell id={record.key} name={record.name}/>,
      sorter: (a, b) => stringValuesCompare(a.name, b.name),
    },
];
  
interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
}

function remapDirectionDataToTableData(directionsData: DirectionData[]): DataType[] {
    return directionsData.map(dir => ({
        key: dir.id,
        ...dir
    }))
}

function calcTableSize(windowHeight: number) {
    return windowHeight - HEADER_HEIGHT - MARGINS * 2 - USERS_TABLE_HEADER_HEIGHT - USERS_TABLE_FOOTER_HEIGHT - USERS_ACTION_BUTTONS_HEIGHT
}

type DirectionsTableProps = {
    directionsData: DirectionData[] | null,
}

function DirectionsTable({
    directionsData,
}: DirectionsTableProps) {
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

    const selectedDirectionsRowKeys = useAtom(selectedDirectionsRowKeysAtom)
    const handleSetSelectedDirectionsRowKeys= useAction(setSelectedDirectionsRowKeys)

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys: selectedDirectionsRowKeys,
        onChange: handleSetSelectedDirectionsRowKeys,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
        columnWidth: 60
    }

    const data = useMemo(() => directionsData && remapDirectionDataToTableData(directionsData), [directionsData])

    const onRowClick = (record: DataType) => {
        return {
            onClick: () => {
                if (selectedDirectionsRowKeys.includes(record.key)) {
                    handleSetSelectedDirectionsRowKeys(selectedDirectionsRowKeys.filter(key => key !== record.key))
                }
                else {
                    handleSetSelectedDirectionsRowKeys([...selectedDirectionsRowKeys, record.key])
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
            loading={!directionsData}
            style={{
                borderRadius: 10,
                background: "#ffffff"
            }}
        />
    )
}

export {
    DirectionsTable,
}